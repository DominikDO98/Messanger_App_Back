import { FieldPacket } from "mysql2";
import { TMessage, TMessageCreation } from "../types/messege.type";
import { pool } from "../utils/db";

type LoadMessageResult = [TMessage[], FieldPacket[]]
type SaveMessageResult = [string[], FieldPacket[]]

export class MessegesRepository {
    constructor () {}

    

    static async loadMessages (room_id: string): Promise<Partial<TMessage[]> | null> {
        const [ results ] = await pool.execute('SELECT `message_text`, `created_at`, `message_id`, `from_user_id` FROM `messages` WHERE `to_room_id` = :room_id ORDER BY `created_at` ASC', {
            room_id: room_id,
        }) as LoadMessageResult

        console.log(results);
        
        return results
        
    }
    static async sendMessage (message: Omit<TMessage, 'created_at'>): Promise<string> {
            await pool.execute('INSERT INTO `messages` (`message_id`, `from_user_id`, `to_room_id`, `message_text`) VALUES (:message_id, :user_id, :room_id, :message_text)', {
                message_id: message.message_id,
                user_id: message.from_user_id,
                room_id: message.to_room_id,
                message_text: message.message_text,
            })
            
            const [results] = await pool.execute('SELECT `message_id`, `to_room_id` FROM `messages` WHERE `message_id` = :id', {
                id: message.message_id,
            })
            
            
            return results[0]
        
    }

    
}