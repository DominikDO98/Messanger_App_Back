import Router from 'express';
import { TUser } from '../types/index.types';

export const authRouter = Router();

const users: Omit<TUser, 'id'>[] = [
    {
        username: 'Name',
        password: 'Pass'
    }
]

authRouter
    .post('/login', (req, res) => {
        res.send('Login is here')
    })

    .post('/register', (req, res) => {
        res.send("register is here")
    })