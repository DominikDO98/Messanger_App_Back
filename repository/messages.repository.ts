import { TMessage } from "../types/messege.type";
import { pool } from "../utils/db";

export class MessegesRepository {
    constructor () {}

    static async getAllTheRooms (user_id: string): Promise<string | null> {
        const [ results ] = await pool.execute('SELECT `room_id` FROM `room_users` WHERE `user_id` = :user_id', {
            user_id: user_id,
        })

        console.log(results)
        return results[0]
    }

    static async loadMessages (room_id: string): Promise<Partial<TMessage[]> | null> {
        const [ results ] = await pool.execute('SELECT `message_text`, `created_at`, `messege_id`, `from_user_id` FROM `messeges` WHERE `to_room_id` = :room_id ORDER BY `created_at` ASC LIMIT 50', {
            room_id: room_id,
        });

        console.log(results);
        return results[0]
        
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
            console.log(results[0]);
            
            return results[0]
        
    }

    
}