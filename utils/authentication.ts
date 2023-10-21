require('dotenv').config();
import jwt from 'jsonwebtoken';
import  { TUserJWT }  from '../types/user.types';
import { NextFunction, Request, Response } from 'express';

export const generateToken = (user: TUserJWT) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}

export const autorizeToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    
    const token = authHeader ? authHeader : null
    if (!token) return res.sendStatus(401)

     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: Error, user: TUserJWT) => {
        console.log(err);
        if (err) return res.sendStatus(403)
        req.body = user
        next()
    });
    next()
} 