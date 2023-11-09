import { TUser, TUserJWT } from "../types/user.types"
import { pool } from "../utils/db"


export class AuthRepository {
    constructor () {}
    static async getUser (username: string) {
        console.log(username);
        
        const [ results ] = await pool.execute('SELECT `user_id` FROM `users` WHERE `username` = :username', {
            username: username
        })

        return results[0]
    }

    static async registerUser (user: TUser): Promise<TUserJWT | null> {
        await pool.execute('INSERT INTO `users` (`user_id`, `username`, `password`) VALUES (:id, :username, :password)', {
            id: user.user_id,
            username: user.username,
            password: user.password,
        })
        const [results] = await pool.execute('SELECT `user_id`, `username` FROM `users` WHERE `user_id` = :id', {
            id: user.user_id,
        })

        return results[0]
    }

    static async login (user: TUserJWT): Promise <TUser> {
        const [ results ] = await pool.execute('SELECT `user_id`, `username`, `password` FROM `users` WHERE `username` = :username', {
            username: user.username
        })
        
        return results[0]
    }
}

