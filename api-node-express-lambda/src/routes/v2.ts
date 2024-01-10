import express from "express";
import SofttekController from "../controllers/v2/SofttekController";
import SofttekAlternativeController from "../controllers/v2/SofttekAlternativeController";

let router = express.Router();
router.use('/softtek', SofttekController);
router.use('/alternative', SofttekAlternativeController);

export default router;