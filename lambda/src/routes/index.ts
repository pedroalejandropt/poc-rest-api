import v1 from "./v1"
import v2 from "./v2"
import type Controllers from "../interfaces/Controllers";

const controllers: Controllers = {
   ...v1,
   ...v2
};

export default controllers;