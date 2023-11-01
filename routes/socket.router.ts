import { app } from "../utils/app";
import path from 'path';
import { autorizeToken } from "../utils/authentication";
import { Router } from "express";

export const socket = app.get('/ws/:room_id', autorizeToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

