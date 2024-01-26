import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>{
    //read token
    const token = req.headers['authorization'];

    //if no token return error
    if(!token){
        return res.status(401).send('Unauthorized Access');
    }

    //check if token is valid

    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
       // todo***********************
        console.log(payload);
    }catch(err){
        return res.status(401).send("unauthorized");
    }

    next();
}

export default jwtAuth;