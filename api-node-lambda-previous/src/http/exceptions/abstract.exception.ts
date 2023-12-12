export abstract class HttpException {
  public readonly statusCode: number;
  public readonly body: string;
  constructor(statusCode: number, body: any) {
    this.statusCode = statusCode;
    if (!body) {
      this.body = null;
    } else if (typeof body === "string") {
      this.body = body;
    } else {
      this.body = JSON.stringify(body);
    }
  }
}
