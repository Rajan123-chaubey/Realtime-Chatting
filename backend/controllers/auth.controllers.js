import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup= async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
        if(password!==confirmPassword){
            return res.status(400).json({error:"Password doesn't match"})
        }
        const user= await User.findOne({username});
        if(user){
            return res.status(400).json({error:"User already exists"});
        }

        //hash password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        console.log(hashedPassword)
        const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`
       
        //store data in db

        const newUser= await User.create({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilepic: gender==="male" ? boyProfilePic : girlProfilePic

        })

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            message:"user created successfully",
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            gender:newUser.gender,
            profilepic:newUser.profilepic
    })


    }else{
        res.status(400).json({error:"invalid user data"})
    }

    }catch(err){
        console.log("error in signup controller",err.message)
        res.status(500).json({error:"Internal server error"})

    }
}

export const login= async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user= await User.findOne({username});
        const isPasswordCorrect= await bcrypt.compare(password, user?.password||"");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);
        
        res.status(201).json({
            message:"user login successfully",
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            gender:user.gender,
            profilepic:user.profilepic
    })     

    }catch(err){
        console.log("error in login controller",err.message)
        res.status(500).json({error:"Internal server error"})
    }

}

export const logout=(req,res)=>{
    try{
        res.clearCookie("jwt","",{maxAge:0});
        res.status(201).json({message:"logout successfully"})

    }catch(err){
        console.log("error in logout controller",err.message)
        res.status(500).json({error:"Internal server error"})

    }
}