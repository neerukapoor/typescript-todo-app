import jwt from 'jsonwebtoken'
require('dotenv').config();
import {Request, Response, NextFunction} from 'express';

export const authenticateJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header("jwtToken");
    console.log(accessToken)
    if(accessToken) {
        const token = accessToken.split(' ')[1];
        if(!process.env.JWT_SECRET)
            return res.status(403).json({message: "Got Authentication Error, jwt secret not present"});
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err)
            {
                return res.status(403).json({message: "Got Authentication Error"});
            }
            if(!user)
                return res.status(403).json({message: "Got Authentication Error, user is undefined"});
            if(typeof user === "string")
                return res.status(403).json({message: "Got Authentication Error, user is type of string"});
            console.log(user)
            console.log(user.user.username)
            req.headers["user"] = user.user.username;
            console.log(req.headers["user"])
            next();
        })
    }
    else {
        res.status(404).json({message: "Provide Jwt token"})
    }
}