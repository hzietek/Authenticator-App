const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
    const headerToken = req.header('Authorization');
    let token = '';
    if(headerToken) token = headerToken.split(' ');

    if (token[0] !== 'Bearer') { 
        return res.status(401).send({ 
            error: "Token is not complete" 
        }) 
    } 

    if(!token[1]) return res.status(401).send('Access Denied');

    try {
        const verifiedToken = jwt.verify(token[1], process.env.TOKEN_SECRET);
        res.send(verifiedToken);
    } catch(error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = authentication;