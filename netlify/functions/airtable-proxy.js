// 🔒 네트리파이 서버리스 함수 - 에어테이블 프록시
// API 키를 서버사이드에서 안전하게 처리

exports.handler = async (event, context) => {
    // CORS 헤더 설정
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
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

    // 설정 검증
    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Airtable 설정이 완료되지 않았습니다. 환경변수를 확인하세요.'
            })
        };
    }

    const baseURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

    try {
        if (event.httpMethod === 'POST') {
            // 레코드 생성
            const requestBody = JSON.parse(event.body);
            
            console.log('📝 Airtable 레코드 생성:', requestBody);

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

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Airtable API 에러:', errorText);
                
                return {
                    statusCode: response.status,
                    headers,
                    body: JSON.stringify({
                        error: `Airtable API Error: ${errorText}`
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
                return {
                    statusCode: response.status,
                    headers,
                    body: JSON.stringify({
                        error: `Airtable API Error: ${errorText}`
                    })
                };
            }

            const result = await response.json();
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
                error: 'Internal server error: ' + error.message
            })
        };
    }
};