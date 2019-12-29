const jwt = require('jsonwebtoken');

const JWTHandler = (userID) => {
    return jwt.sign({_id: userID}, process.env.TOKEN_SECRET, { algorithm: 'HS256' }) 
}

module.exports = JWTHandler;