import { app } from "../utlis/app";
import path from 'path';

export const socket = app.get('/ws', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})