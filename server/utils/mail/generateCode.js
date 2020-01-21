const db = require('../../db');
const Speakeasy = require('speakeasy');
const sendCode = require('./sendCode');

const generateCode = (email) => {
    const secret = Speakeasy.generateSecret();
    const code = Speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    }
    );
    sendCode(code, email);
    return secret.base32;
}

module.exports = generateCode;