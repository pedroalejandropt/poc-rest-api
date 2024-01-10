import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { app } from "./config/index";

const application = app();
application.create();
application.start();

exports.handler = (event: APIGatewayProxyEvent, context: any) => {
    const response = application.handler(event, context);
    return response;
};

// handler({
//     path: '/api/v1/softtek', 
//     httpMethod: 'GET', 
//     // body: '{\n\t"name": "Softtek Las Rozas",\n\t"description": "He is happy now!"\n}', 
//     // queryStringParameters: { softtekId: 2 } as any 
// } as APIGatewayProxyEvent, null);