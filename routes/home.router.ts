import Router, { Request, Response } from 'express';
import { autorizeToken } from '../utils/authentication';
import { roomRepo } from '../repository/room.repository';

export const homeRouter = Router();

homeRouter
    .get('/', autorizeToken, (req: Request, res: Response) => {
        res.json(req.body.user)      
    })
    .get('/inbox', autorizeToken, async (req: Request, res: Response) => {
        const rooms = await roomRepo.getAllTheRooms(req.body.user.user_id)
        console.log(rooms);
        res.send(rooms)
    })
    
    

