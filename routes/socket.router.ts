import { app } from "../utils/app";
import path from 'path';
import { authorizeToken } from "../utils/authentication";
import { Request, Response, Router } from "express";
import { MessegesRepository } from "../repository/messages.repository";

export const socket = app.get('/ws/:room_id', authorizeToken, (req, res) => {
    res.json();
})

export const socketRouter = Router()

socketRouter
    .get('/get_messages/:room_id', authorizeToken, async(req: Request, res: Response) => {
        const messagesData = await MessegesRepository.loadMessages(req.params.room_id)

        res.json(messagesData)
    })