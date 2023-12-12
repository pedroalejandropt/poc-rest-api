import { CustomHttp } from "./custom.http";

export class OkHttp extends CustomHttp {
  constructor(body: any) {
    super(200, body);
  }
}
