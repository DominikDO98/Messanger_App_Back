require('dotenv').config();
import jwt from 'jsonwebtoken';
import  { TUserJWT }  from '../types/user.types';

export const generateToken = (user: TUserJWT) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
}