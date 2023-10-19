import WebSocket from 'ws';
import {createServer} from 'http';
import { app } from './app';

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