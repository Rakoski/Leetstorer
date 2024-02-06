const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
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
        return next();
    } catch (err) {
        req.isAuth = false;
        return next();
    }
};
