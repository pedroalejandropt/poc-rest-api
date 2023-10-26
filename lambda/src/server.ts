import controllers from "./routes/index";

exports.handler = async function(event: any) : Promise<any> {
    let response;
    try {
        const controller = controllers[event.path];
        if (controller)
        {
            response = await controller.handle(event);
        }
        else {
            response = {
                statusCode: 404,
                body: JSON.stringify({ message: 'Not Found!'})
            };
        }
    } catch (error) {
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error ' + error })
        };
    }

    return response;
};