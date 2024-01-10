import { log } from "console";
import DuplicateException from "../../models/Exceptions/DuplicateException";
import Exception from "../../models/Exceptions/Exception";
import HttpResponse from "../../models/HttpResponse";
import Softtek from "../../models/Sofftek";

var softteks: any = [
    {
        "id": 1,
        "status": "enabled",
        "name": "Softtek Las Rozas",
        "description": "Madrid, Spain",
        "created_date": "2020-08-03T20:21:43.794Z",
        "deleted_date": "0001-01-01T00:00:00+4:00"
    },
    {
        "id": 2,
        "status": "enabled",
        "name": "Softtek Las Tablas",
        "description": "Madrid, Spain",
        "created_date": "2020-08-03T20:21:43.794Z",
        "deleted_date": "0001-01-01T00:00:00+4:00"
    },
    {
        "id": 3,
        "status": "enabled",
        "name": "Softtek Coruña",
        "description": "Coruña, Spain",
        "created_date": "2020-08-03T20:21:43.794Z",
        "deleted_date": "0001-01-01T00:00:00+4:00"
    }
];

class SofttekService {
    getSoftteks = async (req: any, res: any) => {
        try {
            console.log("here is Softtek")
            if (softteks.length > 0) return res.status(200).json({ data: softteks });//return new HttpResponse(200, { data: softteks });
            else throw new Exception(404, 'No softteks found in the system');
        } catch (error: any) {
            return new HttpResponse(error.statusCode ?? 500, { message: error.message });
        }
    }
    
    getSofttekById = async (req: any) => {
        try {
            const softtekId = req.queryStringParameters ? req.queryStringParameters.softtekId : null;
            let softtek = await softteks.filter((x: any) => x.id == softtekId);
    
            if (softtek.length == 1) {
                return new HttpResponse(200, { message: `Sofftek with Id ${softtekId} Fetched Successfully`, data: softtek });
            } else throw new Exception(404, 'No softtek found in the system');
        } catch (error: any) {
            return new HttpResponse(error.statusCode ?? 500, { message: error.message });
        }
    }
    
    createSofttek = async (req: any) => {
        try {
            const { name, description } = JSON.parse(req.body || '{}');
            const softtek = new Softtek(name, description);    
            const duplicate = await (softteks.filter((x: any) => x.name == name).length > 0) ? true : false;
            
            if (duplicate) throw new DuplicateException('Sofftek already exists')
    
            softteks.push({
                id: softteks.length + 1,
                status: "enabled",
                name: softtek.name,
                description: (softtek.description != undefined) ? softtek.description : '',
                created_date: new Date(),
                deleted_date: '0001-01-01T00:00:00+4:00'
            });

            return new HttpResponse(200, { description: `Softtek ${name} was created!` });
        } catch (error: any) {
            return new HttpResponse(error.statusCode ?? 500, { message: error.message });
        }
    }
    
    updateSofttek = async (req: any) => {
        try {
            const softtekId = req.queryStringParameters ? req.queryStringParameters.softtekId : null;
            const { name, description } = JSON.parse(req.body || '{}');
            const softtek = new Softtek(name, description);
            const missing = await (softteks.filter((x: any) => x.id == softtekId).length == 0) ? true : false;
    
            if (missing) throw new Exception(404, 'No softtek found in the system');
    
            const index = await softteks.findIndex(((x: any) => x.id == softtekId));
            softteks[index].name = softtek.name;
            softteks[index].description = softtek.description;

            if (index || index == 0) return new HttpResponse(200, { description: `Softtek ${name} was updated!` });
        } catch (error: any) {
            return new HttpResponse(error.statusCode ?? 500, { message: error.message });
        }
    }
    
    deleteSofttek = async (req: any) => {
        try {
            const softtekId = req.params.id;
            const softtekIndex = await softteks.findIndex(((x: any) => x.id == softtekId));
            softteks[softtekIndex].status = 'disabled';
    
            if (softtekIndex || softtekIndex == 0) {
                return new HttpResponse(200, { description: "Softtek was deleted!" })
            } else throw new Exception(404, 'No softtek found in the system');
    
        } catch (error: any) {
            return new HttpResponse(error.statusCode ?? 500, { message: error.message });
        }
    }
}

export default SofttekService;
