const jwt = require('jsonwebtoken');

module.exports.verifyToken = async(req, res, next) => {

    const token = req.headers['token']

    if(token){
        jwt.verify(token, "jwtkey", (error, data) => {
            if(error){
                return res.status(400).json({
                    message: "Token invalido"
                });
            } else{
                req.user = data;
                next();
            }

        });
    } else{
        res.status(400).json({
            message: "Enviar Token"
        })
    }

}