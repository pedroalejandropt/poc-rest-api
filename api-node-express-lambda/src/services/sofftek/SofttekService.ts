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
            if (softteks.length > 0) return res.status(200).json({ data: softteks });
            else return res.status(404).json({ message: 'No softteks found in the system' });
            //throw new Exception(404, 'No softteks found in the system');
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    getSofttekById = async (req: any, res: any) => {
        try {
            const id = req.params ? req.params.id : null;
            let softtek = await softteks.filter((x: any) => x.id == id);
    
            if (softtek.length == 1) {
                return res.status(200).json({ message: `Sofftek with Id ${id} Fetched Successfully`, data: softtek });
                //new HttpResponse(200, { message: `Sofftek with Id ${id} Fetched Successfully`, data: softtek });
            } else return res.status(404).json({ message: 'No softtek found in the system' });
            //throw new Exception(404, 'No softtek found in the system');
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    createSofttek = async (req: any, res: any) => {
        try {
            const { name, description } = req.body || '{}';
            const softtek = new Softtek(name, description);
            const duplicate = await (softteks.filter((x: any) => x.name == name).length > 0) ? true : false;
            
            if (duplicate) return res.status(409).json({ message: 'Sofftek already exists' }); 
            //throw new DuplicateException('Sofftek already exists')
    
            softteks.push({
                id: softteks.length + 1,
                status: "enabled",
                name: softtek.name,
                description: (softtek.description != undefined) ? softtek.description : '',
                created_date: new Date(),
                deleted_date: '0001-01-01T00:00:00+4:00'
            });

            return res.status(200).json({ description: `Softtek ${name} was created!` });
            //return new HttpResponse(200, { description: `Softtek ${name} was created!` });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    updateSofttek = async (req: any, res: any) => {
        try {
            const id = req.params ? req.params.id : null;

            const { name, description } = req.body || '{}';
            const softtek = new Softtek(name, description);
            const missing = await (softteks.filter((x: any) => x.id == id).length == 0) ? true : false;
    
            if (missing) return res.status(404).json({ message: 'No softtek found in the system' });
            //throw new Exception(404, 'No softtek found in the system');
    
            const index = await softteks.findIndex(((x: any) => x.id == id));
            softteks[index].name = softtek.name;
            softteks[index].description = softtek.description;

            if (index || index == 0) return res.status(200).json({ description: `Softtek ${name} was updated!` });
            //return new HttpResponse(200, { description: `Softtek ${name} was updated!` });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    deleteSofttek = async (req: any, res: any) => {
        try {
            const id = req.params.id;
            const softtekIndex = await softteks.findIndex(((x: any) => x.id == id));
            softteks[softtekIndex].status = 'disabled';
    
            if (softtekIndex || softtekIndex == 0) {
                return res.status(200).json({ description: "Softtek was deleted!" });
                //return new HttpResponse(200, { description: "Softtek was deleted!" })
            } else 
                return res.status(404).json({ message: 'No softtek found in the system' });
            //throw new Exception(404, 'No softtek found in the system');
    
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default SofttekService;
