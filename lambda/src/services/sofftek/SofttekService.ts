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
    getSoftteks = async (req: any) => {
        try {
    
            if (softteks.length > 0) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({ data: softteks })
                };
            }
    
            return {
                statusCode: 404,
                body: JSON.stringify({ description: 'No softteks found in the system' })
            };
        } catch (error) {
            throw error;
        }
    }
    
    getSofttekById = async (req: any) => {
        try {
            const softtekId = req.queryStringParameters ? req.queryStringParameters.sofftekId : null;
            let softtek = await softteks.filter((x: any) => x.id == softtekId);
    
            if (softtek.length == 1) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        'message': `Sofftek with Id ${softtekId} Fetched Successfully`,
                        'data': softtek
                    })
                };
            }
    
            return {
                statusCode: 200,
                body: {
                    'description': 'No softtek found in the system'
                }
            };
    
        } catch (error) {
            throw error;
        }
    }
    
    createSofttek = async (req: any) => {
        try {
    
            const {
                name,
                description
            } = JSON.parse(req.body || '{}');
    
            console.log(`${name} ${description}`);
    
            if (name === undefined || name === '') {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        'description': 'Name is required',
                        'field': 'name'
                    })
                };
            }
    
            let nameExist = await (softteks.filter((x: any) => x.name == name).length > 0) ? true : false;
            
            if (nameExist) {
                return {
                    statusCode: 409,
                    body: JSON.stringify({
                        'code': 'ENTITY_ALREAY_EXISTS',
                        'description': 'Name Already Exists',
                        'field': 'name'
                    })
                };
            }
    
            const temp = {
                id: softteks.length + 1,
                status: "enabled",
                name: name,
                description: (description != undefined) ? description : '',
                created_date: new Date(),
                deleted_date: '0001-01-01T00:00:00+4:00'
            }
            softteks.push(temp);
    
            return {
                statusCode: 200,
                body: JSON.stringify({
                    'description': `Softtek ${name} was created!`
                })
            };
    
        } catch (error) {
            throw error;
        }
    }
    
    updateSofttek = async (req: any) => {
        try {
            const softtekId = req.queryStringParameters ? req.queryStringParameters.softtekId : null;
            console.log(req);
            
            console.log(softtekId);
            

            const {
                name,
                description
            } = JSON.parse(req.body || '{}');
    
            console.log(`${name} ${description}`);
    
            let softtekExist = await (softteks.filter((x: any) => x.id == softtekId).length > 0) ? true : false;
    
            if (!softtekExist) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({
                        'code': 'BAD_REQUEST_ERROR',
                        'description': 'No softtek found in the system'
                    })
                };
            }
    
            const temp = {
                name: (name != undefined) ? name : '',
                description: (description != undefined) ? description : ''
            }
    
            let softtekIndex = await softteks.findIndex(((x: any) => x.id == softtekId));
            if (temp.description != '') softteks[softtekIndex].name = temp.name;
            if (temp.description != '') softteks[softtekIndex].description = temp.description;
    
            if (softtekIndex || softtekIndex == 0) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        'description': `Softtek ${name} was updated!`
                    })
                };
            } else {
                throw new Error('Something went worng');
            }
        } catch (error) {
            throw error;
        }
    }
    
    deleteSofttek = async (req: any) => {
        try {
    
            const softtekId = req.params.id;
    
            let softtekIndex = await softteks.findIndex(((x: any) => x.id == softtekId));
            softteks[softtekIndex].status = 'disabled';
    
            if (softtekIndex || softtekIndex == 0) {
                console.log("Softtek was deleted!");
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({
                        'code': 'BAD_REQUEST_ERROR',
                        'description': 'No softtek found in the system'
                    })
                };
            }
    
        } catch (error) {
            throw error;
        }
    }
}

export default SofttekService;
