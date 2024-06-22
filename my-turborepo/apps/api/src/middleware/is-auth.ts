import {NextFunction} from "express";
import RequestWithUserAuth from "../utils/RequestWithUserAuth.ts";

const jwt = require('jsonwebtoken');
const User = require('../models/user.ts')

export const isAuth = (req: RequestWithUserAuth, res: Response, next: NextFunction): void => {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY as string);
    } catch (error) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = (decodedToken as any).userId;
    req.isAdmin = (decodedToken as any).isAdmin;
    next();
};
