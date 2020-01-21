const serverApprover = (req, res, next) => {
    if(req.header('access') && req.header('access') === process.env.APP_SECRET) next();
    else return res.status(401).send('No authorization');
}

module.exports = serverApprover;