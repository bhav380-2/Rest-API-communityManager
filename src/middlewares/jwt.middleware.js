import jwt from 'jsonwebtoken';
import env from '../config/environment.js';

const jwtAuth = (req,res,next)=>{
    //read token
    const token = req.headers['authorization'].replace("Bearer ","");
    console.log("*******************",token);

    //if no token return error
    if(!token){
        return res.status(401).send({
            "status": false,
            "errors": [
              {
                "message": "You need to sign in to proceed.",
                "code": "NOT_SIGNEDIN"
              }
            ]
        })
    }

    //check if token is valid

    try{
        const payload = jwt.verify(
            token,
            env.jwt_secret
        );
        req.userId = payload.userID;
        req.userEmail = payload.email;
        
    }catch(err){
        return res.status(401).send({
            "status": false,
            "errors": [
              {
                "message": "You need to sign in to proceed.",
                "code": "NOT_SIGNEDIN"
              }
            ]
        })
    }

    next();
}

export default jwtAuth;