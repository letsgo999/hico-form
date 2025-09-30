// ✅ 실제 설정 예시 - 이 형식으로 airtable-config.js를 수정하세요!

const AIRTABLE_CONFIG = {
    // 🔑 실제 값으로 교체해야 하는 부분들:
    
    API_KEY: 'patABC123XYZ789DEF456GHI',  // ← 1단계에서 발급받은 실제 토큰
    BASE_ID: 'appXYZ123ABC789DEF456',     // ← 2단계에서 확인한 실제 Base ID  
    TABLE_NAME: 'Table 1'                 // ← 에어테이블의 실제 테이블 이름
    
    // 💡 주의사항:
    // - API_KEY는 'pat'로 시작합니다
    // - BASE_ID는 'app'로 시작합니다
    // - TABLE_NAME은 에어테이블에서 보이는 실제 테이블 이름과 정확히 일치해야 합니다
    // - 한글 테이블명도 사용 가능하지만 영문 권장
};

// 🚨 보안 주의: 실제 운영 시에는 API 키를 환경변수로 관리하세요!