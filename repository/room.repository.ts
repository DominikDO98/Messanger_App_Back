import { FieldPacket } from "mysql2";
import { TRoom } from "../types/room.type";
import { TUser, TUserJWT } from "../types/user.types";
import { pool } from "../utils/db";

type RoomResults = [TRoom[], FieldPacket[]];
type UserResults = [TUserJWT[], FieldPacket[]];
export class roomRepo {
    constructor() {}


    static async getAllGroupChats (user_id: string): Promise<TRoom[] | null> {
        const [results] = await pool.execute('WITH chats AS (SELECT `room`, `room_name`, `is_private`, `message_text`, `created_at`, ROW_NUMBER() OVER(PARTITION BY `room` ORDER BY `created_at` DESC) AS `row_number` FROM `room_users` LEFT JOIN `room` ON `room` = `room_id` LEFT JOIN `messages` ON `room` = `to_room_id` WHERE `user` = :user AND `is_private` = 0) SELECT `room`, `room_name`, `is_private`, `message_text`, `created_at` FROM chats WHERE row_number = 1;' , {
            user: user_id
        }) as RoomResults
       

        console.log(results);
        
    
        return results
    };

    static async getAllPrivateRooms (user_id: string): Promise<TUserJWT[] | null> {
        const [results] = await pool.execute('WITH chats AS (SELECT `user_id`, `username`, `room`, `message_text`, `created_at`, ROW_NUMBER() OVER(PARTITION BY `room` ORDER BY `created_at` DESC) AS `row_number` FROM `users` LEFT JOIN `room_users` ON `user_id` = `user`  LEFT JOIN `messages` ON `room` = `to_room_id` WHERE `user_id` IN (SELECT `user` FROM `room_users` WHERE `room` IN (SELECT `room` FROM `room_users` LEFT JOIN `room` ON `room` = `room_id` WHERE `user` = :user AND `is_private` = 1) AND NOT `user` = :user) AND `room` IN (SELECT `room` FROM `room_users` LEFT JOIN `room` ON `room` = `room_id` WHERE `user` = :user AND `is_private` = 1)) SELECT  `user_id`, `username`, `room`, `message_text`, `created_at` FROM chats WHERE row_number = 1', {
            user: user_id
        }) as UserResults

        return results
    }

    static async getRoom (room_id: string): Promise<string[] | null> {
        const [results] = await pool.execute('SELECT `room_id`, `room_name` FROM `room` WHERE `room_id` = :room_id', {
            room_id: room_id,
        })

        return results[0]
    }
    
    static async createRoomPrivate (room: TRoom, users: string[]) {
        console.log(room, users);
            const [checkIfExists] = await pool.execute('SELECT `room`, `is_private` FROM `room_users` LEFT JOIN `room` ON `room_id` = `room` WHERE `user` = :user1 AND `room` IN (SELECT `room` FROM `room_users` WHERE `user` = :user2) AND `is_private` = 1', {
                user1: users[0],
                user2: users[1],
            })

            if (!checkIfExists[0]) {
               
                
            await pool.execute('INSERT INTO `room` (`room_id`, `is_private`) VALUES (:room_id, 1)', {
                room_id: room.room,
            })
            await pool.execute('INSERT INTO `room_users` (`room`, `user`) VALUES (:room_id, :user1_id)', {
                room_id: room.room,
                user1_id: users[0],
            })
            await pool.execute('INSERT INTO `room_users` (`room`, `user`) VALUES (:room_id, :user1_id)', {
                room_id: room.room,
                user1_id: users[1],
            })
        } else {
            throw new Error('taka konwersacja już istnieje')
        }
    }

    static async createGroupChat (room: TRoom, users: string[]) {
        await pool.execute('INSERT INTO `room` (`room_id`, `room_name`,`is_private`) VALUES (:room_id, :room_name, 0)', {
            room_id: room.room,
            room_name: room.room_name,
        })

        await pool.execute('INSERT INTO `room_users` (`room`, `user`) VALUES (:room_id, :user1_id)', {
            room_id: room.room,
            user1_id: users[0],
        })

        await pool.execute('INSERT INTO `room_users` (`room`, `user`) VALUES (:room_id, :user1_id)', {
            room_id: room.room,
            user1_id: users[1],
        })
        
    }

    static async addPersonToGroupChat (room: string, user: string) {
        await pool.execute('INSERT INTO `room_users` (`room`, `user`) VALUES (:room_id, :user_id)', {
            room_id: room,
            user_id: user,
        })
    }
}