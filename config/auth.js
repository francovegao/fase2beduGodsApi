const secret = require('./secret');
const { expressjwt } = require('express-jwt');

function getTokenFromHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer'){
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = { //autorizacion
    required: function(req, res, next){
        if(!req.auth || !req.auth.user){
            return res.sendStatus(401);
        }
        next();
    },
    isAdmin: function(req, res, next){
        if(!req.auth){
            return res.sendStatus(401);
        }
        if(req.auth.user !== 'admin'){
            return res.sendStatus(403);
        }
        next();
    },
    optional: expressjwt({ //autenticacion
        secret: secret,
        credentialsRequired: false,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader
    }),
}

module.exports = auth;