import { RowDataPacket } from "mysql2";
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
        const [ results ] = await pool.execute('SELECT `message_text`, `created_at`, `messege_id`, `from_user_id` FROM `messeges` WHERE `to_room_id` = :room_id', {
            room_id: room_id,
        });

        console.log(results);
        return results[0]
        
    }

    
}
MessegesRepository.getAllTheRooms('920a23f8-0fb8-4e15-8a01-3e010f01e9cc')

