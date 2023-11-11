"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const authenticateJwtToken = (req, res, next) => {
    const accessToken = req.header("jwtToken");
    if (accessToken) {
        const token = accessToken.split(' ')[1];
        if (!process.env.JWT_SECRET)
            return res.status(403).json({ message: "Got Authentication Error, jwt secret not present" });
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Got Authentication Error" });
            }
            if (!user)
                return res.status(403).json({ message: "Got Authentication Error, user is undefined" });
            if (typeof user === "string")
                return res.status(403).json({ message: "Got Authentication Error, user is type of string" });
            console.log(user);
            console.log(user.user.username);
            req.headers["user"] = user.user.username;
            console.log(req.headers["user"]);
            next();
        });
    }
    else {
        res.status(404).json({ message: "Provide Jwt token" });
    }
};
exports.authenticateJwtToken = authenticateJwtToken;
