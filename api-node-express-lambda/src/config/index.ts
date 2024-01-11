import express from 'express';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';
import routes from '../routes/index';

function app() {
    let server = express(),
        create,
        start;

    let handler = serverless(server);

    create = () => {
        
        // set all the server things
        server.set('env', process.env.NODE_ENV || 'local');
        server.set('port', 3000);
        server.set('hostname', "localhost");
        
        // add middleware to parse the json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: false
        }));
        
        // Set up routes
        server.use("/", routes);
    };

    start = () => {
        server.listen(3000, function () {
            console.log('Express server listening on - http://localhost:3000');
        });
    };
    return {
        create: create,
        handler: handler,
        start: start
    };
};

export { app };