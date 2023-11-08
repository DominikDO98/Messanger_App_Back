import { createServer } from 'http';
import { v4 as uuid } from "uuid";
import WebSocket from 'ws';
import { MessegesRepository } from '../repository/messages.repository';
import { socket } from '../routes/socket.router';
import { TMessage, TMessageCreation } from '../types/messege.type';



export const server = createServer(socket)
const wss = new WebSocket.Server({ server: server})

wss.on('connection', async (ws: WebSocket) => {
    

    ws.on('message', data => {
        const message: TMessageCreation = JSON.parse(String(data))
        
        const newMessage: Omit<TMessage, 'created_at'> = {
            message_id: uuid(),
            from_user_id: message.from_user_id,
            to_room_id: message.to_room_id,
            message_text: message.message_text,
            
        }
        console.log('recived msg: ', newMessage.message_text);

        MessegesRepository.sendMessage(newMessage);

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(newMessage));
        });
        
    })
    
})