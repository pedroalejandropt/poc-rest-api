import express from "express";
import SofttekController from "../controllers/v1/SofttekController";

let router = express.Router();
router.use('/softtek', SofttekController);

export default router;