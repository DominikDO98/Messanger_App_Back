import Router from 'express';
import { autorizeToken } from '../utils/authentication';

export const homeRouter = Router();

homeRouter
    .get('/', autorizeToken, (req, res) => {
        res.json(req.body.user)
        console.log(req.body.user);
        
    })
    
    

