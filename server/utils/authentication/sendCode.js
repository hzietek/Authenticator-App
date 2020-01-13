const Speakeasy = require('speakeasy');
const sendCode = (code, secret) => {
    console.log(code, secret);
    const verify = Speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: code
    });
    console.log("weryfikacja", verify);
}

module.exports = sendCode;