import { HttpException } from "./abstract.exception";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, {
      error: "Not Found",
      message,
    });
  }
}
