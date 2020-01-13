const db = require('../db');
const Speakeasy = require('speakeasy');
const sendCode = require('../utils/authentication/sendCode');
const generateCode = (req, res) => {
    const secret = Speakeasy.generateSecret();
    //res.send(secret.base32);
    const code = Speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    }
    );
    sendCode(code, secret);
    return secret.base32;
}

module.exports = generateCode;