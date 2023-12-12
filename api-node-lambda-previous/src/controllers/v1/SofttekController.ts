import SofttekService from '../../services/sofftek/SofttekService';

const handle = async (event: any) => {
    const method = event.httpMethod;
    const softtekId = event.queryStringParameters ? event.queryStringParameters.softtekId : null;
    const _service = new SofttekService();
    
    switch (method) {
        case 'GET':
            if (softtekId) {
                return _service.getSofttekById(event);
            } else {
                return _service.getSoftteks(event);
            }
        case 'POST':
            return _service.createSofttek(event);
        case 'PUT':
            return _service.updateSofttek(event);
        case 'DELETE':
            return _service.deleteSofttek(event);
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method Not Allowed' })
            };
    }
};

export { handle };