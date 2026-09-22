const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userModel=require('../models/User')


const register=async(req,res)=>{

    try{

        const {username,email,password}=req.body


        const userExist=await userModel.findOne({email})

        if(userExist){

            return res.status(400).json({

                success:false,
                message:"User already exists"

            })

        }


        const hashPassword=await bcrypt.hash(password,10)


        const user=await userModel.create({

            username,
            email,
            password:hashPassword

        })


        res.status(201).json({

            success:true,
            message:"Registration successful",

            token:jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET || "dev-secret",{expiresIn:"7d"}),
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }

        })

    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        })

    }

}



const login=async(req,res)=>{

    try{

        const {email,password}=req.body


        const user=await userModel.findOne({email})

        if(!user){

            return res.status(404).json({

                success:false,
                message:"User not found"

            })

        }


        const passwordMatch=await bcrypt.compare(password,user.password)

        if(!passwordMatch){

            return res.status(401).json({

                success:false,
                message:"Invalid email or password"

            })

        }


        res.status(200).json({

            success:true,
            message:"Login successful",

            token:jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET || "dev-secret",{expiresIn:"7d"}),
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }

        })

    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        })

    }

}


module.exports={

    register,
    login

}