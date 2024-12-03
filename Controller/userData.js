
import userModel from '../Model/UserModel.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const registerUser=async(req,res)=>{
    const {hospitalName,ownerName,lisenceNumber,email,pass}=req.body;
 
    try{
        const existinguser=await userModel.findOne({email});
        if(existinguser){
            res.status(300).json({success:false,message:'user already exist'});
        }
        if(!existinguser){
        const hashpassword=await bcrypt.hash(pass,10);
         const newuser=new userModel({
            hospitalName,
            ownerName,
            lisenceNumber,
            email,
            pass:hashpassword,
         }) 
         await newuser.save(); 
         res.status(401).json({success:true,message:'Signup Sucessful'}) 
        }

    }
    catch(error){
        console.log(error);
    }

}
const Loginuser=async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await userModel.findOne({email})
        if(!user){
            res.status(301).json({success:false,message:'user not exist'});
        }
        if(user){
            const ismatch=await bcrypt.compare(pass,user.pass);
            if(!ismatch){
                res.status(601).json({success:false,message:'User or Password is not valid'})
            }
            if(ismatch){
                res.status(500).json({success:true,message:'Login Sucessful',email});
            }


        }
      
    }
    catch(error){
        console.log(error);
    }
    
    
}
const FetchData=async(req,res)=>{
    const {email}=req.query;
    try{
        const data=await userModel.find({email});
      
        if ( !data) {
            return res.status(400).json({ message: 'Customer email is required.' });
          }
      
     

            res.status(200).json({success:true,data});
        

    }
    catch(error){
        console.log(error);
    }
}

export {registerUser,Loginuser,FetchData};