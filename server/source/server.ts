import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import router from '../routes/calculateFibonacci';

const NAMESPACE = 'Server';
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}, STATUS - [${res.statusCode}]`);
    });
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/getNearestFibonacciNumber', router);

app.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

app.listen(config.server.port, function () {
    console.info(`Server listen on: ${config.server.port}`);
});
