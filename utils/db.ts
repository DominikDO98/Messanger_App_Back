import {createPool} from "mysql2";
import { dbConfig } from "../config/db.config";

const pool = createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
})