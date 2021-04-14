import { Router } from 'express'
import { check, validationResult } from 'express-validator';
import User from '../models/users.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import config from 'config'
const router= Router();

router.post(
    '/register',
    [
        check('name','should not empty').not().isEmpty(),
        check('email','invalid email').isEmail(),
        check('password','password is required').not().isEmpty()
    ],
    async(req,res)=>{
        try{
            let {name,email,password}=req.body;
            let user = await User.findOne({email});
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(401).send(errors);
            }
            if(user){
                return res.status(401).send("user already exist");
            }

            

            const salt= await bcryptjs.genSalt(10);
            password= await bcryptjs.hash(password,salt);
            
            user=new User({
                name,
                email,
                password
            });
            await user.save();
            console.log(user);
            const payload ={
                user:{
                    id:user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (err,token)=>{
                    if(err) throw err;
                    res.json({token});
                }
            )
        }catch(error){
            console.log(error.message);
            return res.status(500).json({msg:"server error"});
        }
        res.send(req.body)
    }
)


export default router;