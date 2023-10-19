import WebSocket from 'ws';
import {createServer} from 'http';
import { app } from './app';
import path from 'path'

const socket = app.get('/ws', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

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