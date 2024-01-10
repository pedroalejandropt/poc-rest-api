// import SofttekService from '../../services/sofftek/SofttekService';

// const handle = async (event: any) => {
//     const method = event.httpMethod;
//     const softtekId = event.queryStringParameters ? event.queryStringParameters.softtekId : null;
//     const _service = new SofttekService();
    
//     switch (method) {
//         case 'GET':
//             if (softtekId) {
//                 return _service.getSofttekById(event);
//             } else {
//                 return _service.getSoftteks(event);
//             }
//         case 'POST':
//             return _service.createSofttek(event);
//         case 'PUT':
//             return _service.updateSofttek(event);
//         case 'DELETE':
//             return _service.deleteSofttek(event);
//         default:
//             return {
//                 statusCode: 405,
//                 body: JSON.stringify({ message: 'Method Not Allowed' })
//             };
//     }
// };

// export { handle };

import express from "express";
import SofttekService from '../../services/sofftek/SofttekService';
const _service = new SofttekService();
const router = express.Router();

router.get('/', _service.getSoftteks);

router.get('/:id', _service.getSofttekById);

router.get('/:id/event/:eventId', _service.getSofttekById);

router.post('/', _service.createSofttek);

router.put('/:id', _service.updateSofttek);

router.delete('/:id', _service.deleteSofttek);


export default router;