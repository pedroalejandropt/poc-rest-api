import { InternalServerError } from "./http/exceptions/internal-server-error.exception";
import { NotFoundException } from "./http/exceptions/not-found.exception";
import controllers from "./routes/index";

console.log("Lambda started");

exports.handler = async function(event: any) : Promise<any> {
    let response;
    try {
        const controller = controllers[event.path];
        if (controller)
        {
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
