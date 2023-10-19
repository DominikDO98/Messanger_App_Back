import express from 'express';
import { homeRouter } from './routes/home.router';
import { authRouter } from './routes/auth.router';

import { app } from './utlis/app'
import { socket } from './utlis/websocket'

app.use(express.json());

app.use('/', homeRouter);
app.use("/auth", authRouter);

socket.listen(3000, 'localhost', () => {
    console.log("Server is listening on port: 3000");
});
