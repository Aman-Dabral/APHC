const jwt = require('jsonwebtoken');

// Check if user is valid or not
const checkAuth = (req, res, next) => {
    const token = req.body?.APHC_JWT_TOKEN;

    // If there is no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }else{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                // If token is tampered
                return res.status(401).json({ message: 'Token is not valid' });
            }else{
                // Allow access
                // userData is the object containing user information from the token
                req.userData = decoded;
                next();
            }
        })
    }
};

module.exports = checkAuth;