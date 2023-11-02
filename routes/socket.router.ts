import { app } from "../utils/app";
import path from 'path';
import { authorizeToken } from "../utils/authentication";

export const socket = app.get('/ws/:room_id', authorizeToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})