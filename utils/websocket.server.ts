import WebSocket from 'ws';
import {createServer} from 'http';

import { socket } from '../routes/socket.router';



export const server = createServer(socket)
const wss = new WebSocket.Server({ server: server})

wss.on('connection', (ws) => {
    console.log('A new client connected');
    ws.send('Welcome New Client');

    ws.on('message', (message) => {
        console.log('recived msg: ', String(message));

        wss.clients.forEach((client) => {
            client.send(message);
        });
        
    })
    
})