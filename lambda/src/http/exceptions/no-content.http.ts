import { CustomHttp } from "../custom.http";

export class NoContentHttp extends CustomHttp {
    constructor() {
        super(204, null);
    }
}
