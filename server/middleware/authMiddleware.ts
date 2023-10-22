import jwt from 'jsonwebtoken'
require('dotenv').config();
import {Request, Response, NextFunction} from 'express';

export const authenticateJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header("token");
    if(accessToken) {
        const token = accessToken.split(' ')[1];
        if(!process.env.JWT_SECRET)
            return res.status(403).json({message: "Got Authentication Error"});
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err)
            {
                return res.status(403).json({message: "Got Authentication Error"});
            }
            if(!user)
                return res.status(403).json({message: "Got Authentication Error, user is undefined"});
            if(typeof user === "string")
                return res.status(403).json({message: "Got Authentication Error, user is type of string"});
            req.headers["user"] = user.username;
            next();
        })
    }
    else {
        res.status(404).json({message: "Provide Jwt token"})
    }
}