import type Controllers from "../interfaces/Controllers";

const controllers: Controllers = {
    '/api/v1/softtek': require('../controllers/v1/SofttekController'),
    '/api/v1/softtekian': require('../controllers/v1/SofttekianController'),
    '/api/v1/event': require('../controllers/v1/EventController')
};

export default controllers;