import express from 'express';
import { homeRouter } from './routes/home.router';
import { authRouter } from './routes/auth.router';
import WebSocket, { WebSocketServer } from 'ws';
import {createServer} from 'http';

const app = express();

app.use(express.json());

app.use('/', homeRouter);
app.use("/auth", authRouter);

const socket = createServer(app)
const wsServer = new WebSocket.Server({ server: socket})

wsServer.on('connection', (ws) => {
    console.log('A new client connected');
    ws.send('Welcome New Client');

    ws.on('message', (message) => {
        console.log('recived msg: ', String(message));

        ws.send(message);
        
    })
    
})

socket.listen(3000, 'localhost', () => {
    console.log("Server is listening on port: 3000");
});
