import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import controllers from "./routes/index";
import { extractParameters } from "./utils";
import HttpResponse from "./models/HttpResponse";

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
            response = new HttpResponse(404, { message: 'Not Found!' });
        }
    } catch (error: any) {
        response = new HttpResponse(500, { message: 'Internal Server Error ' + error.message });
    }
    return response;
};

// handler({
//     path: '/api/v1/softtek', 
//     httpMethod: 'GET', 
//     body: '{\n\t"name": "Softtek Las Rozas",\n\t"description": "He is happy now!"\n}', 
//     queryStringParameters: { softtekId: 2 } as any 
// } as APIGatewayProxyEvent);