import WebSocket from 'ws';
import {createServer} from 'http';
import { v4 as uuid } from "uuid";

import { socket } from '../routes/socket.router';
import { TMessage, TMessageCreation } from '../types/messege.type';
import { MessegesRepository } from '../repository/messages.repository';



export const server = createServer(socket)
const wss = new WebSocket.Server({ server: server})

wss.on('connection', async (ws: WebSocket) => {
    const messageHistory = await MessegesRepository.loadMessages('1');
    ws.send(JSON.stringify(messageHistory))

    ws.on('message', message_text => {
        const newMessage: TMessage = {
            message_id: uuid(),
            from_user_id: '1',
            to_room_id: '1',            
            created_at: new Date().toLocaleString(),
            message_text: String(message_text),
            
        }
        console.log('recived msg: ', newMessage.message_text);

        MessegesRepository.sendMessage(newMessage);

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(newMessage));
        });
        
    })
    
})