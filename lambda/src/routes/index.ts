import v1 from "./v1"
import v2 from "./v2"
import type Controllers from "../interfaces/Controllers";
import v3 from "./v3";

const controllers: Controllers = {
   ...v1,
   ...v2,
   ...v3,
};

export default controllers;
