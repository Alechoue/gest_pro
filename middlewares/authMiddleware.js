const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMidlleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token){
        return res.status(401).json({message: 'Token manquant. Accès impossible'})
    }

    try {
        const decodedToken = jwt.verify(token.split("")[1],process.env.JWT_SECRET)
        req.user = decodedToken
        next()
    }
    catch(err){
        next()
    }
}
module.exports = authMidlleware