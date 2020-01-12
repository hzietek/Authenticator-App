const jwt = require('jsonwebtoken');

const JWTHandler = (data) => {
    const {name, email, lastLoginDate, multifactorAuth, externalLastLoginData} = data[0];
    return jwt.sign({_name: name, _id: email, _lastLoginDate: lastLoginDate, _multifactorAuth: multifactorAuth, _externalLoginData: externalLastLoginData}, process.env.TOKEN_SECRET, { algorithm: 'HS256' }) 
}

module.exports = JWTHandler;