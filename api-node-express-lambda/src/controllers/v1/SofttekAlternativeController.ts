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