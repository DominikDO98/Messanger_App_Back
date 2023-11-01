import { TRoom } from "../types/room.type";
import { pool } from "../utils/db";

export class roomRepo {
    constructor() {}


    static async getAllTheRooms (user_id: string): Promise<string | null> {
        const [ results ] = await pool.execute('SELECT `room_id` FROM `room_users` WHERE `user_id` = :user_id', {
            user_id: user_id,
        })

        console.log(results)
        return results[0]
    };

    static async getRoom (room_id: string): Promise<string[] | null> {
        const [results] = await pool.execute('SELECT `room_id`, `room_name` FROM `room` WHERE `room_id` = :room_id', {
            room_id: room_id,
        })

        return results[0]
    }
    
    static async createRoom (room: TRoom) {
        await pool.execute('INSERT INTO `room` (`room_id`, `room_name`) VALUES (:room_id, :room_name)', {
            room_id: room.room_id,
            room_name: room.room_name
        })
    }
}