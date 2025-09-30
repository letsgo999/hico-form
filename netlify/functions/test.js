// 🧪 간단한 테스트 함수
exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: '✅ Netlify Functions가 정상 작동합니다!',
            timestamp: new Date().toISOString(),
            method: event.httpMethod,
            path: event.path
        })
    };
};