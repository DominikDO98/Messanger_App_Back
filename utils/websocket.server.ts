import WebSocket from 'ws';
import {createServer} from 'http';
import { v4 as uuid } from "uuid";

import { socket } from '../routes/socket.router';
import { TMessage, TMessageCreation } from '../types/messege.type';



export const server = createServer(socket)
const wss = new WebSocket.Server({ server: server})

wss.on('connection', (ws) => {
    console.log('A new client connected');

    ws.on('message', message_text => {
        const newMessage: Partial<TMessage> = {
            message_text: String(message_text),
            created_at: new Date().toLocaleString(),
            message_id: uuid(),
        }
        console.log('recived msg: ', newMessage.message_text);

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(newMessage));
        });
        
    })
    
})