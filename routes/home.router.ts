import Router, { IRouter } from 'express';

export const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        res.send('Hello, World!')
    });

