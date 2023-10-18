import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {v4 as uuid} from "uuid";
import  { TUser, TUserCreation }  from '../types/user.types';

export const authRouter = Router();

const users: TUserCreation[] = [
    {
        username: 'Name',
        password: 'Pass'
    }
]

authRouter
    .get('/users', (req, res) => {
        res.send(users)//Testowe, usunąc potem
    })

    .post('/login', async (req: Request, res: Response) => {
       const user = users.find(user => user.username === req.body.username)
       if (!user) {
        return res.status(400).send('User not found')
       }
       try {
       if (await bcrypt.compare(req.body.password, user.password)) {
        res.send("Logged In")
       } else {
        res.status(401).send('Invalid input')
       }} catch (err) {
         res.status(500).send(err)
       }
    })

    .post('/register', async (req: Request, res: Response) => {
        if (req.body.username && req.body.password) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user: TUserCreation = {
                username: req.body.username,
                password: hashedPassword,
            }
            users.push(user);
            res.status(201).send('user created')
        } catch (err) {
            res.status(500).send(err)
        }} else {
            res.status(400).send('Invalid input')
        }
    })