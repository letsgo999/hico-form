// 🔒 보안 강화된 에어테이블 설정 (환경변수 사용)

const AIRTABLE_CONFIG = {
    // 환경변수 사용 (프로덕션 환경)
    API_KEY: typeof process !== 'undefined' && process.env 
        ? process.env.AIRTABLE_API_KEY || 'YOUR_AIRTABLE_API_KEY'
        : 'YOUR_AIRTABLE_API_KEY',
        
    BASE_ID: typeof process !== 'undefined' && process.env 
        ? process.env.AIRTABLE_BASE_ID || 'YOUR_BASE_ID'
        : 'YOUR_BASE_ID',
        
    TABLE_NAME: 'Table 1'  // 테이블명은 공개되어도 안전
};

// 개발/테스트 환경에서는 직접 설정 (로컬에서만 사용)
// 실제 운영시에는 네트리파이 환경변수 설정 필요

// Airtable API Functions
class AirtableAPI {
    constructor(config) {
        this.apiKey = config.API_KEY;
        this.baseId = config.BASE_ID;
        this.tableName = config.TABLE_NAME;
        this.baseURL = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(this.tableName)}`;
        
        // API 키 검증
        if (!this.apiKey || this.apiKey === 'YOUR_AIRTABLE_API_KEY') {
            console.warn('⚠️ Airtable API 키가 설정되지 않았습니다. 환경변수를 확인해주세요.');
        }
    }

    // 새 레코드 생성
    async createRecord(data) {
        if (!this.apiKey || this.apiKey === 'YOUR_AIRTABLE_API_KEY') {
            throw new Error('Airtable API 키가 설정되지 않았습니다.');
        }
        
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

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Airtable API Error: ${error.error?.message || response.statusText}`);
            }

            const result = await response.json();
            return result.records[0];
        } catch (error) {
            console.error('Airtable 레코드 생성 실패:', error);
            throw error;
        }
    }

    // 모든 레코드 조회
    async getAllRecords(params = {}) {
        if (!this.apiKey || this.apiKey === 'YOUR_AIRTABLE_API_KEY') {
            throw new Error('Airtable API 키가 설정되지 않았습니다.');
        }
        
        try {
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
                throw new Error(`Airtable API Error: ${error.error?.message || response.statusText}`);
            }

            const result = await response.json();
            return result.records;
        } catch (error) {
            console.error('Airtable 레코드 조회 실패:', error);
            throw error;
        }
    }

    // 레코드 삭제
    async deleteRecord(recordId) {
        if (!this.apiKey || this.apiKey === 'YOUR_AIRTABLE_API_KEY') {
            throw new Error('Airtable API 키가 설정되지 않았습니다.');
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