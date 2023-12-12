import type Controllers from "../interfaces/Controllers";

function extractParameters(url: string, controllers: Controllers): { parameters: any, match: string | null } {
    const parameters: any = {};
    let match: string | null = null;
    const pathComponents = url.split("/");
    const controllersKeys = Object.keys(controllers)

    if (controllersKeys.includes(url)) return { parameters, match: url }
  
    controllersKeys.forEach((controller) => {
        const controllerParts = controller.split("/");
        if (controllerParts.length == pathComponents.length) {
            controllerParts.forEach((controllerPart, i) => {
                if (controllerPart != pathComponents[i] && controllerPart.startsWith(":")){
                    const parameterName = controllerPart.substring(1);
                    const parameterValue = pathComponents[i];
                    parameters[parameterName] = parameterValue;
                }
                else if (controllerPart != pathComponents[i]){
                    match = null
                }
                else {
                    match = controller
                }
            });
            if (match != null) return { parameters, match };
        }
    });

    return { parameters, match };
  }

  export {
    extractParameters
  };