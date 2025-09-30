// 🔒 네트리파이 서버리스 함수 - 에어테이블 프록시
// API 키를 서버사이드에서 안전하게 처리

exports.handler = async (event, context) => {
    // CORS 헤더 설정
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // OPTIONS 요청 처리 (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // 환경변수에서 API 설정 가져오기
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'APEC_Applications';

    console.log('🔧 환경변수 체크:');
    console.log('- API Key 존재:', !!AIRTABLE_API_KEY);
    console.log('- Base ID 존재:', !!AIRTABLE_BASE_ID);
    console.log('- Table Name:', AIRTABLE_TABLE_NAME);

    // 설정 검증
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Airtable 환경변수가 설정되지 않았습니다.',
                details: {
                    apiKey: !!AIRTABLE_API_KEY,
                    baseId: !!AIRTABLE_BASE_ID,
                    tableName: AIRTABLE_TABLE_NAME
                }
            })
        };
    }

    const baseURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

    try {
        if (event.httpMethod === 'POST') {
            // 레코드 생성
            let requestBody;
            try {
                requestBody = JSON.parse(event.body);
            } catch (parseError) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        error: 'Invalid JSON in request body',
                        details: parseError.message
                    })
                };
            }
            
            console.log('📝 Airtable 레코드 생성:', requestBody);

            // Node.js fetch 사용 (Netlify에서 기본 제공)
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: [{
                        fields: requestBody
                    }]
                })
            });

            console.log('📡 Airtable 응답 상태:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Airtable API 에러:', errorText);
                
                return {
                    statusCode: response.status,
                    headers,
                    body: JSON.stringify({
                        error: `Airtable API Error: ${response.status}`,
                        details: errorText,
                        url: baseURL
                    })
                };
            }

            const result = await response.json();
            console.log('✅ Airtable 저장 성공:', result.records[0].id);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.records[0])
            };

        } else if (event.httpMethod === 'GET') {
            // 레코드 조회
            console.log('📊 Airtable 레코드 조회 요청');

            const queryParams = new URLSearchParams();
            queryParams.append('sort[0][field]', 'Submitted At');
            queryParams.append('sort[0][direction]', 'desc');
            queryParams.append('maxRecords', '100');

            const response = await fetch(`${baseURL}?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Airtable 조회 에러:', errorText);
                return {
                    statusCode: response.status,
                    headers,
                    body: JSON.stringify({
                        error: `Airtable API Error: ${response.status}`,
                        details: errorText
                    })
                };
            }

            const result = await response.json();
            console.log('✅ Airtable 조회 성공:', result.records.length, '개 레코드');

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.records)
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('❌ 서버 에러:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                details: error.message,
                stack: error.stack
            })
        };
    }
};