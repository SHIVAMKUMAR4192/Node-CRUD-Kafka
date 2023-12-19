const jwt = require('jsonwebtoken');

function authenticateToken(req,res,next){
    let token = req.header('Authorization');
    token = token.substring(7);
    console.log('token : ', token)
     const corelationId = req.header('corelation-Id');

    if(!token){
    return res.status(401).json({message:'Unauthorized'})
    }

    jwt.verify(token, process.env.JWT_SECRET,(err,user) =>{
        if(err){
            console.error('JWT Verification Error:', err);
            return res.status(401).json({message:'Unauthorized'});
        }
        console.log(' req user : ', req.user);
        req.user = user;
         req.corelationId = corelationId;
        next();
    });
}

module.exports = authenticateToken;