import { FieldPacket } from "mysql2";
import { TRoom } from "../types/room.type";
import { TUser, TUserJWT } from "../types/user.types";
import { pool } from "../utils/db";

type RoomResults = [TRoom[], FieldPacket[]];
type UserResults = [TUserJWT[], FieldPacket[]];
export class roomRepo {
    constructor() {}


    static async getAllGroupChats (user_id: string): Promise<TRoom[] | null> {
        const [results] = await pool.execute('SELECT `room`, `room_name`, `is_private` FROM `room_users` LEFT JOIN `room` ON `room` = `room_id` WHERE `user_id` = :user_id AND `is_private` = 0 ' , {
            user_id: user_id
        }) as RoomResults
       

        console.log(results);
        
    
        return results
    };

    static async getAllPrivateRooms (user_id: string): Promise<TUserJWT[] | null> {
        const [friends] = await pool.execute('SELECT `user_id`, `username`FROM `users` WHERE `user_id` IN (SELECT `user_id` FROM `room_users` WHERE `room` IN (SELECT `room` FROM `room_users` LEFT JOIN `room` ON `room` = `room_id` WHERE `user_id` = :user_id AND `is_private` = 1) AND NOT `user_id` = :user_id)', {
            user_id: user_id
        }) as UserResults

        return friends
    }

    static async getRoom (room_id: string): Promise<string[] | null> {
        const [results] = await pool.execute('SELECT `room_id`, `room_name` FROM `room` WHERE `room_id` = :room_id', {
            room_id: room_id,
        })

        return results[0]
    }
    
    static async createRoom (room: TRoom) {
        await pool.execute('INSERT INTO `room` (`room_id`, `room_name`) VALUES (:room_id, :room_name)', {
            room_id: room.room,
            room_name: room.room_name
        })
    }
}