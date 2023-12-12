import Controllers from "../interfaces/Controllers";
import { DebugController } from "../controllers/v3/debug-controller";

const debugController = new DebugController();

const controllers: Controllers = {
  "/api/v3/debug": { handle: debugController.helloWorld.bind(debugController) },
};

export default controllers;
