import express from 'express';
import { homeRouter } from './routes/home.router';
import { authRouter } from './routes/auth.router';

import { app } from './utils/app';
import { server } from './utils/websocket.server';

app.use(express.json());

app.use('/', homeRouter);
app.use("/auth", authRouter);

server.listen(3000, 'localhost', () => {
    console.log("Server is listening on port: 3000");
});
