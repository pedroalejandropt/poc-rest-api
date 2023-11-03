import { HttpException } from "./abstract.exception";

export class InternalServerError extends HttpException {
  constructor(message: string) {
    super(500, {
      error: "Internal Server Error",
      message,
    });
  }
}
