import Router, { Request, Response } from 'express';
import {v4 as uuid} from 'uuid';
import { authorizeToken} from '../utils/authentication';
import { roomRepo } from '../repository/room.repository';
import { TRoom } from '../types/room.type';
import { TUserJWT } from '../types/user.types';
import { AuthRepository } from '../repository/auth.repository';

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
    .post('/create/room/private', authorizeToken, async (req: Request, res: Response) => {
        const user2 = await AuthRepository.getUser(req.body.contact.name)
      const room: TRoom = {
        room: uuid(),
        room_name: null,
        is_private: true,
      };
      const users: string[] = [
        req.body.user.user_id,
        user2.user_id,
      ];
      
      try {

      await roomRepo.createRoomPrivate(room, users);
      res.status(201).json("działa")
      } catch (err) {

        console.log(err);
        res.status(400).json('nie działa')
      };

      
    })
    
    .post('/create/room/group', authorizeToken, async (req: Request, res: Response) => {
        const user2 = await AuthRepository.getUser(req.body.contact.name)
        const room: TRoom = {
          room: uuid(),
          room_name: req.body.contact.room,
          is_private: false,
        };
        const users: string[] = [
          req.body.user.user_id,
          user2.user_id,
        ];

        try {
  
        await roomRepo.createGroupChat(room, users);
        res.status(201).json("działa")
        } catch (err) {
  
          console.log(err);
          res.status(400).json('nie działa')
        };
  
      
      })

      .post('/add-person', authorizeToken, async(req: Request, res: Response) => {
       try {
        const user = await AuthRepository.getUser(req.body.contact.name)
      
        await roomRepo.addPersonToGroupChat(req.body.contact.room, user.user_id)
        res.status(200)
        
       } catch (error) {
        console.log(error);
        

       } 
      })

