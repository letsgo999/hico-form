// 🧪 로컬 테스트용 설정 파일
// ⚠️ 이 파일은 .gitignore에 추가하여 GitHub에 업로드하지 마세요!

// 실제 에어테이블 정보를 여기에 입력 (로컬 테스트용)
window.AIRTABLE_LOCAL_CONFIG = {
    API_KEY: 'YOUR_ACTUAL_AIRTABLE_API_KEY',     // ← 여기에 실제 API 키 입력 (pat로 시작)
    BASE_ID: 'YOUR_ACTUAL_BASE_ID',              // ← 여기에 실제 Base ID 입력 (app로 시작)  
    TABLE_NAME: 'APEC_Applications'               // ← 테이블명
};

// 사용법:
// 1. 위의 YOUR_ACTUAL_... 부분을 실제 값으로 교체
// 2. HTML 파일에서 이 파일을 airtable-config.js보다 먼저 로드
// 3. 로컬에서만 사용, GitHub에는 업로드하지 말 것!