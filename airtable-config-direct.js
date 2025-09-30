// 🚀 직접 API 키 입력 버전 (테스트용)
// ⚠️ 보안상 테스트 후 즉시 삭제하세요!

const AIRTABLE_CONFIG = {
    // 🔑 여기에 실제 에어테이블 정보를 직접 입력하세요
    API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',        // ← pat로 시작하는 실제 API 키
    BASE_ID: 'YOUR_ACTUAL_BASE_ID_HERE',        // ← app로 시작하는 실제 Base ID  
    TABLE_NAME: 'APEC_Applications'             // ← 테이블명 (확인됨)
};

// 설정 검증
console.log('🔧 Airtable 직접 설정 로드됨');
console.log('- API Key 설정:', AIRTABLE_CONFIG.API_KEY !== 'YOUR_ACTUAL_API_KEY_HERE');
console.log('- Base ID 설정:', AIRTABLE_CONFIG.BASE_ID !== 'YOUR_ACTUAL_BASE_ID_HERE');
console.log('- Table Name:', AIRTABLE_CONFIG.TABLE_NAME);

// Airtable API Functions (간소화됨)
class AirtableAPI {
    constructor(config) {
        this.apiKey = config.API_KEY;
        this.baseId = config.BASE_ID;
        this.tableName = config.TABLE_NAME;
        this.baseURL = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(this.tableName)}`;
        
        console.log('📡 Airtable API 초기화:', this.baseURL);
    }

    // 새 레코드 생성
    async createRecord(data) {
        console.log('📝 Airtable 레코드 생성 시도:', data);
        
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: [{
                        fields: data
                    }]
                })
            });

            console.log('📡 Response 상태:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API 응답 에러:', errorText);
                throw new Error(`Airtable API Error (${response.status}): ${errorText}`);
            }

            const result = await response.json();
            console.log('✅ Airtable 저장 성공:', result);
            return result.records[0];
        } catch (error) {
            console.error('❌ Airtable 에러 상세:', error);
            throw error;
        }
    }

    // 모든 레코드 조회
    async getAllRecords(params = {}) {
        console.log('📊 Airtable 레코드 조회 시도');
        
        try {
            let url = this.baseURL;
            const queryParams = new URLSearchParams();
            queryParams.append('maxRecords', '50');
            
            if (queryParams.toString()) {
                url += '?' + queryParams.toString();
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ 조회 API 에러:', errorText);
                throw new Error(`Airtable API Error (${response.status}): ${errorText}`);
            }

            const result = await response.json();
            console.log('✅ Airtable 조회 성공:', result.records.length, '개 레코드');
            return result.records;
        } catch (error) {
            console.error('❌ Airtable 조회 에러:', error);
            throw error;
        }
    }
}

// 전역 인스턴스 생성
window.airtableAPI = new AirtableAPI(AIRTABLE_CONFIG);

// 테스트 함수
window.testAirtable = async function() {
    console.log('🧪 Airtable 연결 테스트 시작...');
    
    try {
        // 기존 레코드 조회 테스트
        const records = await window.airtableAPI.getAllRecords();
        console.log('✅ 조회 테스트 성공');
        
        // 새 레코드 생성 테스트
        const testData = {
            'Name': '테스트사용자_' + Date.now(),
            'Phone': '010-1234-5678',
            'Email': 'test@example.com',
            'Performance Type': 'Traditional',
            'Status': 'Pending',
            'Submitted At': new Date().toISOString()
        };
        
        const newRecord = await window.airtableAPI.createRecord(testData);
        console.log('✅ 생성 테스트 성공:', newRecord.id);
        
        alert('🎉 Airtable 연결 테스트 성공! 콘솔을 확인하세요.');
    } catch (error) {
        console.error('❌ 테스트 실패:', error);
        alert('❌ 테스트 실패: ' + error.message);
    }
};