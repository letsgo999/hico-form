// 🔍 에어테이블 연동 디버그 도구
// 브라우저 콘솔에서 window.debugAirtable() 실행

window.debugAirtable = async function() {
    console.log('🔧 === 에어테이블 디버그 시작 ===');
    
    // 1. 설정값 확인
    console.log('📋 현재 설정:');
    console.log('- API_KEY 존재:', !!AIRTABLE_CONFIG.API_KEY && AIRTABLE_CONFIG.API_KEY !== 'YOUR_AIRTABLE_API_KEY');
    console.log('- API_KEY 시작:', AIRTABLE_CONFIG.API_KEY ? AIRTABLE_CONFIG.API_KEY.substring(0, 10) + '...' : 'null');
    console.log('- BASE_ID:', AIRTABLE_CONFIG.BASE_ID);
    console.log('- TABLE_NAME:', AIRTABLE_CONFIG.TABLE_NAME);
    console.log('- Base URL:', window.airtableAPI?.baseURL);
    
    // 2. 네트워크 연결 테스트
    console.log('\n🌐 네트워크 테스트:');
    try {
        const response = await fetch('https://api.airtable.com/v0/meta/bases', {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`
            }
        });
        
        if (response.ok) {
            console.log('✅ Airtable API 연결 성공');
            const bases = await response.json();
            console.log('📊 접근 가능한 Base 수:', bases.bases?.length || 0);
        } else {
            console.error('❌ Airtable API 연결 실패:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('❌ 네트워크 에러:', error.message);
    }
    
    // 3. 테이블 접근 테스트
    console.log('\n📋 테이블 접근 테스트:');
    try {
        const records = await window.airtableAPI.getAllRecords({ maxRecords: 1 });
        console.log('✅ 테이블 접근 성공');
        console.log('📊 기존 레코드 수 확인됨');
    } catch (error) {
        console.error('❌ 테이블 접근 실패:', error.message);
    }
    
    // 4. 테스트 데이터 생성
    console.log('\n🧪 테스트 데이터 생성:');
    try {
        const testData = {
            'Name': '테스트_' + Date.now(),
            'Phone': '010-0000-0000',
            'Email': 'test@debug.com',
            'Performance Type': 'Traditional',
            'Status': 'Pending',
            'Submitted At': new Date().toISOString()
        };
        
        const result = await window.airtableAPI.createRecord(testData);
        console.log('✅ 테스트 데이터 생성 성공:', result.id);
        console.log('🎉 에어테이블 연동이 정상 작동합니다!');
    } catch (error) {
        console.error('❌ 테스트 데이터 생성 실패:', error.message);
        
        // 상세 에러 분석
        if (error.message.includes('401')) {
            console.log('💡 해결방법: API 키를 다시 확인해보세요');
        } else if (error.message.includes('404')) {
            console.log('💡 해결방법: Base ID나 테이블명을 다시 확인해보세요');
        } else if (error.message.includes('422')) {
            console.log('💡 해결방법: 필드명이나 데이터 형식을 확인해보세요');
        }
    }
    
    console.log('\n🔧 === 에어테이블 디버그 완료 ===');
};

// 페이지 로드 시 자동 실행
window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🔧 디버그 도구 준비됨. 콘솔에서 debugAirtable() 실행하세요.');
    }, 1000);
});