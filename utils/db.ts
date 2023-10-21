import {createPool} from "mysql2/promise";
import { dbConfig } from "../config/db.config";

export const pool = createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    namedPlaceholders: true,
});