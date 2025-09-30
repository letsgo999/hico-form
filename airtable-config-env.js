// 🔒 환경변수를 사용한 안전한 에어테이블 설정
// 네트리파이 환경변수와 로컬 테스트를 모두 지원

const AIRTABLE_CONFIG = {
    // 환경변수 우선, 없으면 기본값 사용
    API_KEY: getEnvVariable('AIRTABLE_API_KEY', 'YOUR_AIRTABLE_API_KEY'),
    BASE_ID: getEnvVariable('AIRTABLE_BASE_ID', 'YOUR_BASE_ID'), 
    TABLE_NAME: getEnvVariable('AIRTABLE_TABLE_NAME', 'APEC_Applications')
};

// 환경변수 가져오기 함수 (브라우저/서버 환경 모두 지원)
function getEnvVariable(name, defaultValue) {
    // 서버사이드 환경변수 (네트리파이 빌드 시)
    if (typeof process !== 'undefined' && process.env && process.env[name]) {
        return process.env[name];
    }
    
    // 브라우저에서 window 객체를 통한 접근 (네트리파이 런타임)
    if (typeof window !== 'undefined' && window.ENV && window.ENV[name]) {
        return window.ENV[name];
    }
    
    // 로컬 개발용 설정 (airtable-config-local.js에서 오버라이드)
    if (typeof window !== 'undefined' && window.AIRTABLE_LOCAL_CONFIG && window.AIRTABLE_LOCAL_CONFIG[name]) {
        return window.AIRTABLE_LOCAL_CONFIG[name];
    }
    
    return defaultValue;
}

// API 키 유효성 검사
function validateConfig(config) {
    const issues = [];
    
    if (!config.API_KEY || config.API_KEY === 'YOUR_AIRTABLE_API_KEY') {
        issues.push('API_KEY가 설정되지 않았습니다.');
    } else if (!config.API_KEY.startsWith('pat')) {
        issues.push('API_KEY가 올바른 형식이 아닙니다. (pat로 시작해야 함)');
    }
    
    if (!config.BASE_ID || config.BASE_ID === 'YOUR_BASE_ID') {
        issues.push('BASE_ID가 설정되지 않았습니다.');
    } else if (!config.BASE_ID.startsWith('app')) {
        issues.push('BASE_ID가 올바른 형식이 아닙니다. (app로 시작해야 함)');
    }
    
    if (!config.TABLE_NAME) {
        issues.push('TABLE_NAME이 설정되지 않았습니다.');
    }
    
    return issues;
}

// 설정 검증 및 경고 표시
const configIssues = validateConfig(AIRTABLE_CONFIG);
if (configIssues.length > 0) {
    console.warn('🔧 Airtable 설정 확인 필요:', configIssues);
}

// Airtable API Functions (기존과 동일, 에러 처리 강화)
class AirtableAPI {
    constructor(config) {
        this.config = config;
        this.apiKey = config.API_KEY;
        this.baseId = config.BASE_ID;
        this.tableName = config.TABLE_NAME;
        this.baseURL = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(this.tableName)}`;
        
        // 초기 설정 검증
        this.isConfigured = this.validateConfiguration();
    }
    
    validateConfiguration() {
        const issues = validateConfig(this.config);
        if (issues.length > 0) {
            console.error('❌ Airtable 설정 오류:', issues);
            return false;
        }
        console.log('✅ Airtable 설정 완료');
        return true;
    }

    // 새 레코드 생성
    async createRecord(data) {
        if (!this.isConfigured) {
            throw new Error('Airtable 설정이 완료되지 않았습니다. 환경변수를 확인해주세요.');
        }
        
        try {
            console.log('📝 Airtable에 데이터 저장 중...', data);
            
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

            if (!response.ok) {
                const error = await response.json();
                console.error('❌ Airtable API 에러:', error);
                throw new Error(`Airtable API Error (${response.status}): ${error.error?.message || response.statusText}`);
            }

            const result = await response.json();
            console.log('✅ Airtable 저장 성공:', result.records[0].id);
            return result.records[0];
        } catch (error) {
            console.error('❌ Airtable 레코드 생성 실패:', error);
            throw error;
        }
    }

    // 모든 레코드 조회
    async getAllRecords(params = {}) {
        if (!this.isConfigured) {
            throw new Error('Airtable 설정이 완료되지 않았습니다. 환경변수를 확인해주세요.');
        }
        
        try {
            console.log('📊 Airtable에서 데이터 조회 중...');
            
            let url = this.baseURL;
            const queryParams = new URLSearchParams();
            
            // 정렬 설정 (최신순)
            queryParams.append('sort[0][field]', 'Submitted At');
            queryParams.append('sort[0][direction]', 'desc');
            
            // 최대 레코드 수
            queryParams.append('maxRecords', params.maxRecords || '100');
            
            if (queryParams.toString()) {
                url += '?' + queryParams.toString();
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('❌ Airtable API 에러:', error);
                throw new Error(`Airtable API Error (${response.status}): ${error.error?.message || response.statusText}`);
            }

            const result = await response.json();
            console.log(`✅ Airtable 조회 성공: ${result.records.length}개 레코드`);
            return result.records;
        } catch (error) {
            console.error('❌ Airtable 레코드 조회 실패:', error);
            throw error;
        }
    }

    // 레코드 삭제 (관리자 기능)
    async deleteRecord(recordId) {
        if (!this.isConfigured) {
            throw new Error('Airtable 설정이 완료되지 않았습니다.');
        }
        
        try {
            const response = await fetch(`${this.baseURL}/${recordId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Airtable API Error: ${error.error?.message || response.statusText}`);
            }

            return true;
        } catch (error) {
            console.error('Airtable 레코드 삭제 실패:', error);
            throw error;
        }
    }
}

// 전역 인스턴스 생성
window.airtableAPI = new AirtableAPI(AIRTABLE_CONFIG);

// 디버그 정보 (개발 모드에서만)
if (typeof window !== 'undefined') {
    window.airtableDebug = {
        config: AIRTABLE_CONFIG,
        isConfigured: window.airtableAPI.isConfigured,
        testConnection: () => window.airtableAPI.getAllRecords({ maxRecords: 1 })
    };
}