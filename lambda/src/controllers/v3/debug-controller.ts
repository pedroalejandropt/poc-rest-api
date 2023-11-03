import { OkHttp } from "../../http/ok.http";

export class DebugController {
  public helloWorld(event: any) {
    return new OkHttp({ message: "hello world!" });
  }
}
