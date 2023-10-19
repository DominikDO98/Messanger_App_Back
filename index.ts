import express from 'express';
import { homeRouter } from './routes/home.router';
import { authRouter } from './routes/auth.router';

import { app } from './utlis/app'
import { server } from './utlis/websocket'

app.use(express.json());

app.use('/', homeRouter);
app.use("/auth", authRouter);

server.listen(3000, 'localhost', () => {
    console.log("Server is listening on port: 3000");
});
