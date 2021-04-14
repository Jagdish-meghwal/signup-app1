import jwt from 'jsonwebtoken'
import config from 'config'

const auth=(req,res,next)=>{
    try{
        const token = req.header('x-auth-token');
        const verifiedUser=jwt.verify(
            token,
            config.get('jwtSecret')
        )
        req.user=verifiedUser.user;
        next();
    }catch(error){
        console.log(error.message);

        return res.status(500).json({msg:"server error...."});
    }
}

export default auth;