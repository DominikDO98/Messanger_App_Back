require('dotenv').config();
import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";
import { TUser }  from '../types/user.types';
import { autorizeToken, generateToken } from '../utlis/authentication';

export const authRouter = Router();

const users: TUser[] = [
    {
        id: '1',
        username: 'Name',
        password: 'Pass',
    }
]

authRouter
    .get('/users', autorizeToken, (req, res) => {
        const user: TUser = users.find(user => user.username === req.body.username)
        res.send(user)//Testowe, usunąc potem
    })

    .post('/login', async (req: Request, res: Response) => {
       const user: TUser = users.find(user => user.username === req.body.username)
       if (!user) {
        return res.status(400).send('User not found')
       }
       try {
       
        if (await bcrypt.compare(req.body.password, user.password)) {
        
        const accessToken = generateToken({
            id: user.id, 
            username: user.username
        });
        
        res.json({accessToken: accessToken});
       
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
            users.push(user);

            const accessToken = generateToken({
                id: user.id,
                username: user.username,
            });
            
            
            res.status(201).json({accessToken: accessToken});
        } catch {
            res.status(500).send('nie działa')
        }} else {
            res.status(400).send('Invalid input')
        }
    })