import Router, { Request, Response } from 'express';
import { authorizeToken} from '../utils/authentication';
import { roomRepo } from '../repository/room.repository';

export const homeRouter = Router();

homeRouter
    .get('/', authorizeToken, (req: Request, res: Response) => {
        res.json(req.body.user)      
    })
    .get('/inbox/group', authorizeToken, async (req: Request, res: Response) => {
        const rooms = await roomRepo.getAllGroupChats(req.body.user.user_id)
        console.log(rooms);
        res.send(rooms)
    })
    .get('/inbox/private', authorizeToken, async (req: Request, res: Response) => {
        const chats = await roomRepo.getAllPrivateRooms(req.body.user.user_id)
        console.log(chats);
        res.send(chats)
        
    })
    
    

