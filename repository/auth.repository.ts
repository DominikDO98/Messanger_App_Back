import { TUser } from "../types/user.types"
import { pool } from "../utils/db"


export class AuthRepository {
    constructor () {

    }

    static async createUser (user: TUser) {
        await pool.execute('INSERT INTO `users` (`user_id`, `username`, `password`) VALUES (:id, :username, :password)', {
            id: user.id,
            username: user.username,
            password: user.password,
        }) 

        return user.id
    } 
}