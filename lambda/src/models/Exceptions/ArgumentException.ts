import Exception from "./Exception";

export default class ArgumentException extends Exception {
    constructor(message: string){
        super(400, message);
    }
}