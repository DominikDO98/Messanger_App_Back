require('dotenv').config();
import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";
import { TUser, TUserJWT }  from '../types/user.types';
import { autorizeToken, generateToken } from '../utils/authentication';
import { AuthRepository } from '../repository/auth.repository';

export const authRouter = Router();


authRouter

    .post('/login', async (req: Request, res: Response) => {
       const user: TUser = await AuthRepository.login(req.body) 
       
            
       if (!req.body.username || !req.body.password) {
        return res.status(400).send('Invalid login or password')
       }
       try {
       
        if (await bcrypt.compare(req.body.password, user.password)) {

        const accessToken = generateToken({
            user_id: user.user_id, 
            username: user.username
        });
        
        res.json(accessToken)
    } else {

        res.status(401).send('Invalid login or password')

       }} catch (err) {

         res.status(500).send('Coś nie tak')

       }
    })

    .post('/register', async (req: Request, res: Response) => {
        if (req.body.username && req.body.password) {
        try {
            console.log(req.body);
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user: TUser = {
                user_id: uuid(),
                username: req.body.username,
                password: hashedPassword,
            }            
            console.log(user);
            
            const newUser  = await AuthRepository.registerUser(user)
            console.log(newUser);
            
            
            const accessToken = generateToken({
                user_id: newUser.user_id,
                username: newUser.username,
            });
            
            
            
            res.status(201).json(accessToken);


        } catch (err) {

            if (err.code === "ER_DUP_ENTRY") {
                res.status(400).send('Taki username już istnieje')
            } else res.status(500).send(err)

        }} else {
            res.status(400).send('Invalid input')
        }
    })