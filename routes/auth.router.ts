require('dotenv').config();
import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";
import { TUser, TUserJWT }  from '../types/user.types';
import { autorizeToken, generateToken } from '../utils/authentication';
import { AuthRepository } from '../repository/auth.repository';

export const authRouter = Router();


authRouter
    .get('/users', autorizeToken, (req, res) => {
        // const user: TUser = users.find(user => user.username === req.body.username)
        // res.send(user)//Testowe, usunąc potem
    })

    .post('/login', async (req: Request, res: Response) => {
       const user = await AuthRepository.login(req.body)      
       if (!user) {
        return res.status(400).send('Invalid login or password')
       }
       try {
       
        if (await bcrypt.compare(req.body.password, user.password)) {
        
        const accessToken = generateToken({
            id: user.id, 
            username: user.username
        });
        
        res.json(accessToken);
       
    } else {

        res.status(401).send('Invalid login or password')

       }} catch (err) {

         res.status(500).send('Coś nie tak')

       }
    })

    .post('/register', async (req: Request, res: Response) => {
        if (req.body.username && req.body.password) {
        try {
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user: TUser = {
                id: uuid(),
                username: req.body.username,
                password: hashedPassword,
            }            
            
            const newUser  = await AuthRepository.registerUser(user) as any
            console.log(newUser);
            
            const accessToken = generateToken({
                id: newUser.id,
                username: newUser.username,
            });
            
            
            
            res.status(201).json(accessToken);


        } catch (err) {

            if (err.code === "ER_DUP_ENTRY") {
                res.status(400).send('Taki username już istnieje')
            } else res.status(500).send('Error')

        }} else {
            res.status(400).send('Invalid input')
        }
    })