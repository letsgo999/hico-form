# APEC 2025 Korean Cultural Events - 사전신청 랜딩페이지

## 프로젝트 개요

APEC 정상회의 기간(2025년 10월 27일 - 11월 1일) 중 HICO에서 개최되는 한국 전통문화 공연의 사전신청을 위한 현대적이고 세련된 멀티 페이지 웹사이트입니다.

### 🎯 프로젝트 목표
- APEC 정상회의 부대행사 홍보 및 참가자 모집
- 한국의 전통문화와 K-Pop 문화를 세계에 알리는 문화교류 플랫폼
- 직관적이고 사용하기 쉬운 사전신청 시스템 제공

## 🎭 공연 프로그램

### 1. 한국 전통무용 공연
- **일시**: 2025년 10월 29일 (수) 오후 7:00 - 8:30
- **장소**: HICO 
- **정원**: 200명
- **내용**: 부채춤, 검무 등 전통 궁중무용, 한복 패션쇼, 전통 악기 연주
- **특징**: 한/영 동시통역 제공, 관객 참여 체험 프로그램

### 2. K-Pop 아이돌 공연
- **일시**: 2025년 10월 30일 (목) 오후 8:00 - 9:30
- **장소**: HICO
- **정원**: 300명
- **내용**: 인기 K-Pop 그룹 특별 무대, 글로벌 히트곡 라이브 공연
- **특징**: 팬미팅 및 사진 촬영 시간 제공

## ✨ 주요 기능

### 현재 구현된 기능

#### 🎨 UI/UX
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **현대적 디자인**: Tailwind CSS 기반 세련된 스타일링
- **애니메이션 효과**: 부드러운 스크롤, 페이드인, 호버 효과
- **Glass morphism**: 투명도와 블러 효과를 활용한 현대적 카드 디자인
- **그라디언트 텍스트**: 브랜드 아이덴티티를 강화하는 그라디언트 효과

#### 📱 사용자 인터랙션
- **스무스 스크롤**: 부드러운 페이지 내 네비게이션
- **모달 시스템**: 각 공연별 독립적인 신청 폼
- **실시간 폼 검증**: 입력 중 즉시 유효성 검사
- **키보드 지원**: ESC키로 모달 닫기, 접근성 고려
- **로딩 상태 표시**: 신청 처리 중 시각적 피드백

#### 🔧 기술적 기능
- **폼 검증**: 이메일, 전화번호 형식 검증
- **데이터 저장**: localStorage를 활용한 신청 데이터 보관
- **UUID 생성**: 각 신청건별 고유 식별자
- **통계 기능**: 신청 현황 및 국적별 통계 (개발자 도구)
- **에러 핸들링**: 사용자 친화적 오류 메시지

### 📋 데이터 수집 항목 (간소화됨)
- 신청자 이름 (필수)
- 휴대폰번호 (필수) - 당첨자 발표 문자용
- 이메일 주소 (필수) - 당첨자 발표 및 안내용
- 개인정보 수집 동의 (필수)

## 🚀 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업 구조
- **CSS3**: 커스텀 스타일링 + Tailwind CSS
- **JavaScript ES6+**: 바닐라 JavaScript, 모듈화된 코드 구조
- **Font Awesome**: 아이콘 라이브러리
- **Google Fonts**: Noto Sans KR, Inter 폰트

### Backend & Security
- **Netlify Functions**: 서버리스 백엔드 프록시
- **Airtable API**: 데이터베이스 연동
- **보안 아키텍처**: API 키 서버사이드 보호

### 외부 라이브러리 (CDN)
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
```

## 📁 프로젝트 구조

```
apec-cultural-events/
├── index.html                     # 메인 랜딩페이지
├── traditional-dance.html         # 한국 전통무용 신청 페이지 (보안 업데이트됨)
├── kpop-concert.html             # K-Pop 아이돌 공연 신청 페이지 (보안 업데이트됨)
├── admin-dashboard.html          # 실시간 관리자 대시보드 (보안 업데이트됨)
├── netlify/
│   └── functions/
│       └── airtable-proxy.js     # 🔒 보안 프록시 함수 (API 키 보호)
├── airtable-config-secure.js     # 🔒 보안 Airtable 설정
├── js/
│   └── main.js                   # 메인 JavaScript 로직 (레거시)
├── images/
│   └── hico-building.jpg         # HICO 건물 배경 이미지
├── AIRTABLE_SETUP_GUIDE.md       # Airtable 설정 가이드
└── README.md                     # 프로젝트 문서
```

## 🔗 기능별 진입점

### 주요 페이지 및 섹션
- **index.html**: 메인 랜딩페이지
  - Hero Section: 메인 비주얼 및 CTA
  - Performance Section: 공연 정보 카드
  - Info Section: 신청 안내사항
- **traditional-dance.html**: 전통무용 신청 전용 페이지
- **kpop-concert.html**: K-Pop 공연 신청 전용 페이지

### JavaScript 주요 함수
- **메인 페이지 (main.js)**:
  - `scrollToPerformances()`: 공연 섹션으로 스크롤
  - `getRegistrationStats()`: 신청 통계 조회
- **신청 페이지들 (각 페이지 내장)**:
  - `submitApplication(event)`: **API 연동** 신청 데이터 처리
  - `validateForm(data)`: 폼 검증 (이름, 휴대폰, 이메일)
  - `isValidPhone(phone)`: 휴대폰번호 형식 검증
  - `isValidEmail(email)`: 이메일 형식 검증
- **관리자 대시보드 (admin-dashboard.html)**:
  - `loadData()`: **실시간 API 데이터** 로드 + localStorage 백업
  - `exportToCSV()`: 최신 데이터 CSV 내보내기
  - `clearAllData()`: **서버 + 로컬** 전체 데이터 삭제
  - `refreshData()`: API 데이터 실시간 새로고침

## 💾 데이터 저장

### RESTful API 연동 + LocalStorage 백업
프로젝트는 **실제 데이터베이스**와 **LocalStorage 백업** 이중 시스템을 사용합니다:

#### **데이터베이스 스키마 (apec_applications 테이블)**
```javascript
{
  id: "auto-generated UUID",
  name: "신청자명",
  phone: "휴대폰번호", 
  email: "이메일주소",
  performance_type: "traditional|kpop",
  status: "pending|approved|rejected",
  submitted_at: "ISO datetime",
  created_at: "auto-generated timestamp",
  updated_at: "auto-generated timestamp"
}
```

#### **API 엔드포인트**
- **POST** `tables/apec_applications` - 신청 데이터 저장
- **GET** `tables/apec_applications` - 전체 신청 데이터 조회
- **DELETE** `tables/apec_applications/{id}` - 개별 데이터 삭제

#### **백업 시스템**
- **주요 데이터**: 실제 데이터베이스에 저장
- **백업 데이터**: LocalStorage에 저장 (API 실패 시 대체)
- **이중 안전성**: 서버 장애 시에도 데이터 유지

## 🔮 미구현 기능 및 향후 계획

### 보안 및 데이터 관리 (구현 완료)
- [x] **보안 프록시**: Netlify Functions를 통한 API 키 보호
- [x] **Airtable 연동**: 안전한 데이터베이스 연돐
- [x] **실시간 대시보드**: 관리자용 통계 및 데이터 처리
- [x] **이중 안전성**: 서버 + 로컬 데이터 백업
- [ ] 이메일 알림 시스템 (당첨 발표, 확인 메일)

### 추가 기능 (Enhancement)
- [ ] 다국어 지원 (영어, 중국어, 일본어)
- [ ] QR 코드 생성 (입장권 대체)
- [ ] 소셜미디어 공유 기능
- [ ] 실시간 신청 현황 표시
- [ ] 대기열 시스템 (정원 초과 시)
- [ ] SMS 알림 서비스

### 성능 최적화
- [ ] 이미지 최적화 (WebP 포맷, 지연 로딩)
- [ ] CSS 번들링 및 압축
- [ ] JavaScript 코드 스플리팅
- [ ] PWA 구현 (오프라인 지원)

## 🛠️ 개발 및 배포 가이드

### 로컬 개발
1. **환경변수 설정**: Netlify 대시보드에서 Airtable API 키 설정
   ```
   AIRTABLE_API_KEY=pat...
   AIRTABLE_BASE_ID=app...
   AIRTABLE_TABLE_NAME=APEC_Applications
   ```
2. **로컬 테스트**: Netlify Dev CLI로 로컬 서버 실행
3. **디버깅**: 브라우저 콘솔에서 보안 API 통신 확인 가능

### 배포 방법
**웹사이트 배포**: Publish 탭을 사용하여 원클릭 배포 가능

**보안 설정**:
1. Netlify 대시보드에서 환경변수 설정
2. 보안 프록시 함수 자동 배포
3. HTTPS 암호화 통신 자동 적용

### 브라우저 호환성
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📊 성과 지표

### 사용자 경험
- 모바일 반응성: 100% 지원
- 접근성: WCAG 2.1 기본 준수
- 로딩 속도: 3초 이내 초기 렌더링

### 기술적 성과
- 바닐라 JavaScript 사용으로 가벼운 번들 사이즈
- Tailwind CSS로 효율적인 스타일링
- 모듈화된 코드 구조로 유지보수성 확보

## 📞 문의 및 지원

### 행사 문의
- 주최: 대한민국 정부
- 주관: HICO
- 신청 마감: 2024년 10월 26일 23:59
- 당첨 발표: 2024년 10월 27일 09:00

### 기술적 문의
프로젝트 관련 기술적 문의사항이 있으시면 개발팀에 문의해 주세요.

---

### 📅 주요 일정 (2025년)
- **신청 마감**: 10월 26일 (일) 23:59
- **당첨 발표**: 10월 27일 (월) 09:00 (문자 + 이메일)
- **전통무용 공연**: 10월 29일 (수) 19:00
- **K-Pop 공연**: 10월 30일 (목) 20:00
- **행사 기간**: 10월 27일 (월) - 11월 1일 (토)

## 🔒 보안 아키텍처

### 보안 강화 사항 (2024.09.30 업데이트)

#### ✅ API 키 보안 처리
- **문제**: HTML 파일에 Airtable API 키 직접 노출 (보안 취약점)
- **해결**: Netlify Functions 프록시를 통한 서버사이드 API 키 보호
- **효과**: GitHub를 통한 API 키 노출 완전 차단

#### 🛡️ 보안 프록시 시스템
```javascript
// 클라이언트 사이드 (안전)
const response = await fetch('/.netlify/functions/airtable-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

// 서버 사이드에서 안전하게 API 키 처리
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY; // 환경변수
```

#### 🔧 환경변수 설정 (Netlify 배포 시 필수)
```env
AIRTABLE_API_KEY=pat1234567890abcdef  # pat로 시작하는 실제 API 키
AIRTABLE_BASE_ID=app1234567890abcdef  # app로 시작하는 실제 Base ID
AIRTABLE_TABLE_NAME=APEC_Applications  # 테이블명
```

#### 📋 보안 검증 완료 사항
- [x] HTML 페이지에서 API 키 노출 완전 제거
- [x] 보안 프록시 함수 구현 및 테스트
- [x] 모든 API 호출을 보안 엔드포인트로 전환
- [x] 환경변수를 통한 안전한 설정 관리
- [x] CORS 및 에러 핸들링 구현

**© 2025 APEC Summit Korea. All rights reserved.**