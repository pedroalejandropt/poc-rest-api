import { InternalServerError } from "./http/exceptions/internal-server-error.exception";
import { NotFoundException } from "./http/exceptions/not-found.exception";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import controllers from "./routes/index";
import { extractParameters } from "./utils";

console.log("Lambda started");
exports.handler = async function(event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> {
    let response;
    try {
        const { parameters, match } = extractParameters(event.path, controllers);
        if (match)
        {
            const controller = controllers[match];
            response = await controller.handle(event);
        }
        else {
            response = new NotFoundException(`Cannot ${event.httpMethod} ${event.path}`);
        }
    } catch (error) {
        response = new InternalServerError((error as Error).message);
    }
    return response;
};
// handler({
//     path: '/api/v1/softtek', 
//     httpMethod: 'GET', 
//     body: '{\n\t"name": "Softtek Las Rozas",\n\t"description": "He is happy now!"\n}', 
//     queryStringParameters: { softtekId: 2 } as any 
// } as APIGatewayProxyEvent);
