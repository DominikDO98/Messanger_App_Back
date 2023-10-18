import Router from 'express';

export const homeRouter = Router();

homeRouter
    .get('/', (req, res) => {
        res.redirect('/home')
    })
    .get('/home', (req, res) => {
        res.send("homepage")
    })
    

