# 🚀 Airtable 연동 설정 가이드

## ⚠️ 중요: API 키 설정하기

### 1. airtable-config.js 파일 수정

`airtable-config.js` 파일을 열고 다음 정보를 입력하세요:

```javascript
const AIRTABLE_CONFIG = {
    API_KEY: 'YOUR_AIRTABLE_API_KEY',    // ← 여기에 실제 API 키 입력
    BASE_ID: 'YOUR_BASE_ID',             // ← 여기에 실제 Base ID 입력  
    TABLE_NAME: 'APEC Applications'       // ← 테이블 이름 (변경했다면 수정)
};
```

### 2. 정보 찾는 방법

#### API Key 찾기:
1. https://airtable.com 로그인
2. 우상단 프로필 → Account
3. API 탭 → Generate API key
4. 복사한 키를 `API_KEY`에 입력

#### Base ID 찾기:
1. https://airtable.com/api 접속
2. 만든 Base 선택
3. URL에서 `app...` 부분이 Base ID
4. 예시: `appXXXXXXXXXXXXXX`

### 3. 실제 설정 예시

```javascript
const AIRTABLE_CONFIG = {
    API_KEY: 'keyABC123DEF456GHI789',
    BASE_ID: 'appXYZ987ABC654DEF321', 
    TABLE_NAME: 'APEC Applications'
};
```

## ✅ 설정 확인 방법

1. 웹사이트에서 신청 테스트
2. Airtable에서 데이터 확인
3. 관리자 대시보드에서 실시간 데이터 확인

## 🔒 보안 주의사항

**실제 배포 시 보안을 위해:**
- API 키를 환경변수로 설정
- 서버사이드에서 API 호출 처리
- 클라이언트에서 직접 API 키 노출 금지

**현재는 데모/테스트 목적으로만 사용하세요!**