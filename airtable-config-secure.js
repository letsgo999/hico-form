// 🔒 보안 에어테이블 설정 (프록시 사용)
// API 키는 서버사이드에서 안전하게 처리됨

// 보안 프록시 엔드포인트
const PROXY_ENDPOINT = '/.netlify/functions/airtable-proxy';

console.log('🔧 보안 Airtable 설정 로드됨');
console.log('- 프록시 엔드포인트:', PROXY_ENDPOINT);
console.log('- 보안 처리: API 키는 서버사이드에서 안전하게 관리됨');

// 🔒 보안 Airtable API 클래스 (프록시 사용)
class SecureAirtableAPI {
    constructor() {
        this.proxyURL = PROXY_ENDPOINT;
        console.log('🔒 보안 Airtable API 초기화:', this.proxyURL);
    }

    // 새 레코드 생성 (보안 프록시 사용)
    async createRecord(data) {
        console.log('📝 보안 레코드 생성 시도:', data);
        
        try {
            const response = await fetch(this.proxyURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            console.log('📡 프록시 응답 상태:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ 프록시 에러:', errorData);
                throw new Error(`Proxy Error (${response.status}): ${errorData.error || 'Unknown error'}`);
            }

            const result = await response.json();
            console.log('✅ 보안 저장 성공:', result);
            return result;
        } catch (error) {
            console.error('❌ 보안 API 에러 상세:', error);
            throw error;
        }
    }

    // 모든 레코드 조회 (보안 프록시 사용)
    async getAllRecords(params = {}) {
        console.log('📊 보안 레코드 조회 시도');
        
        try {
            const response = await fetch(this.proxyURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ 조회 프록시 에러:', errorData);
                throw new Error(`Proxy Error (${response.status}): ${errorData.error || 'Unknown error'}`);
            }

            const records = await response.json();
            console.log('✅ 보안 조회 성공:', records.length, '개 레코드');
            return records;
        } catch (error) {
            console.error('❌ 보안 조회 에러:', error);
            throw error;
        }
    }
}

// 전역 인스턴스 생성 (보안 버전)
window.airtableAPI = new SecureAirtableAPI();

// 보안 테스트 함수
window.testAirtable = async function() {
    console.log('🧪 보안 Airtable 연결 테스트 시작...');
    
    try {
        // 기존 레코드 조회 테스트
        const records = await window.airtableAPI.getAllRecords();
        console.log('✅ 보안 조회 테스트 성공');
        
        // 새 레코드 생성 테스트
        const testData = {
            'Name': '보안테스트사용자_' + Date.now(),
            'Phone': '010-1234-5678',
            'Email': 'securetest@example.com',
            'Performance Type': 'Traditional',
            'Status': 'Pending',
            'Submitted At': new Date().toISOString()
        };
        
        const newRecord = await window.airtableAPI.createRecord(testData);
        console.log('✅ 보안 생성 테스트 성공:', newRecord.id);
        
        alert('🎉 보안 Airtable 연결 테스트 성공! API 키는 안전하게 보호됩니다.');
    } catch (error) {
        console.error('❌ 보안 테스트 실패:', error);
        alert('❌ 보안 테스트 실패: ' + error.message);
    }
};