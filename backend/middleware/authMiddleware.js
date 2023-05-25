
const jwt = require('jsonwebtoken');

// Checks to see if there is an authentication header containing the jwt
const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // check if jwt exsists
    if(token){
        jwt.verify(token, 'big secret', (err, decodedToken) => {
            if(err){
                return res.status(401).json({error: err.message});
            }
            else{
                req.userId = decodedToken.id
                next();
            }
        });
    }
    else{
        console.log("No Web Token Found");
    }
}

const refresh = (req, res, next) => {
    const refreshToken = req.cookies.RFtoken;

    if(refreshToken){
        jwt.verify(refreshToken, 'test secret', (err, decodedToken) => {
            if(err){
                res.status(400).json({error: err.massage});
            }
            else{
                // returned to userController.js for the refresh in there
                req.valid = true;
                req.userId = decodedToken.id
                next();
            }
        });
    }
}

module.exports = {auth, refresh};