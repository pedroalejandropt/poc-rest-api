import type Controllers from "../interfaces/Controllers";

const controllers: Controllers = {
    '/api/v2/softtek': require('../controllers/v2/SofttekController'),
    '/api/v2/softtekian': require('../controllers/v2/SofttekianController'),
    '/api/v2/event': require('../controllers/v2/EventController')
};

export default controllers;