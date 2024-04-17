const jwt = require('jsonwebtoken');
const User = require('../models/user.ts')

interface RequestWithUser {
    isAuth: boolean;
    userId: string;
    isAdmin: boolean;
    get: CallableFunction
}

module.exports = async (req: RequestWithUser, res: Request, next: CallableFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; // token
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.isAuth = true;
        req.userId = decodedToken.userId;
        req.isAdmin = await User.findById(req.userId).then(user => user.isAdmin);
        return next();
    } catch (err) {
        req.isAuth = false;
        return next();
    }
};
