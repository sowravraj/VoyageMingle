import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async(req,res)=>{
    try{

        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        } = req.body
        const salt = await bcrypt.genSalt();          // for encryption
        const passwordHash = await bcrypt.hash(password, salt); 

        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,        //By hashing passwords before storing them, even if someone gains access to your database, they won't be able to see the original passwords.
            picturePath,
            friends,
            occupation,
            location,
            impressions : Math.floor(Math.random()*10000),
            viewedProfile : Math.floor(Math.random()*10000)
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }  catch(err){
        res.status(500).json({error : err.message})
    }
}

// logging in

export const login = async (req,res) =>{
    try{
      
        const {
            email,password
        } = req.body

        const user = await User.findOne({email:email})
        if (!user) return res.status(400).json({msg : "user doesn\'t not exist"});

        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({msg : "entered password is wrong"});

        const token = jwt.sign({id : user._id},process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({token,user})

    } catch(err){
        res.status(500).json({error: err.message})
    }
}