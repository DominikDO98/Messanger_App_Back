import Router from 'express';

export const authRouter = Router();

authRouter
    .post('/login', (req, res) => {
        res.send('Login is here')
    })

    .post('/register', (req, res) => {
        res.send("register is here")
    })