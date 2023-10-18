import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
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
        res.send(users)
    })

    .post('/login', (req, res) => {
        res.send('Login is here')
    })

    .post('/register', async (req: Request, res: Response) => {
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
        }
    })