// Airtable Configuration
// ⚠️ 실제 배포 시에는 환경변수나 서버사이드에서 처리해야 합니다
const AIRTABLE_CONFIG = {
    // 🔑 여기에 본인의 정보를 입력하세요 (아래는 예시)
    API_KEY: 'YOUR_AIRTABLE_API_KEY',  // 1단계에서 복사한 실제 API 키로 교체 (pat로 시작)
    BASE_ID: 'YOUR_BASE_ID',           // 2단계에서 복사한 실제 Base ID로 교체 (app로 시작)
    TABLE_NAME: 'APEC_Applications'     // 2단계에서 확인한 실제 테이블 이름으로 교체
};

// Airtable API Functions
class AirtableAPI {
    constructor(config) {
        this.apiKey = config.API_KEY;
        this.baseId = config.BASE_ID;
        this.tableName = config.TABLE_NAME;
        this.baseURL = `https://api.airtable.com/v0/${this.baseId}/${encodeURIComponent(this.tableName)}`;
    }

    // 새 레코드 생성
    async createRecord(data) {
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

    // 레코드 업데이트
    async updateRecord(recordId, data) {
        try {
            const response = await fetch(`${this.baseURL}/${recordId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fields: data
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Airtable API Error: ${error.error?.message || response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Airtable 레코드 업데이트 실패:', error);
            throw error;
        }
    }
}

// 전역 인스턴스 생성
window.airtableAPI = new AirtableAPI(AIRTABLE_CONFIG);