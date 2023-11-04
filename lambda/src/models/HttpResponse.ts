import type { APIGatewayProxyResult } from "aws-lambda";

export default class HttpResponse implements APIGatewayProxyResult {
    public statusCode: number;
    public body: any;

    constructor(statusCode: number, body: any) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
    }
}