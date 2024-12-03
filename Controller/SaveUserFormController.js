import BloodUser from "../Model/UserFormModel.js";
const RegisterBloodUser=async(req,res)=>{
    const {SourceMail,userName,userAge,userPhone,BloodGroup,userAddress}=req.body;
    try{
        const user =await BloodUser.findOne({userPhone});
        if(user){
            user.userName=userName;
            user.userAddress=userAddress;
            user.status="Active";
            user.SourceMail=SourceMail;
            await user.save();
             res.status(200).json({success:true,message:'Request Sent Successfully'})
        }
        else{
            const newuser=new BloodUser({
                SourceMail,
                userName,
                userAge,
                userPhone,
                userAddress,
                BloodGroup,
                status:'Active',


            })
            await newuser.save();
            res.status(200).json({success:true,message:'Request Sent Sucessfully'})

        }
    }
    catch(error){
         res.status(400).json({success:false,message:error});
        console.log(error);
        
    }
    
}
const fetchRegisteredUser=async(req,res)=>{
    const {email}=req.query;
    try{
    const RegisteredUser=await BloodUser.find({SourceMail:email});
  
    res.status(200).json({success:true,message:RegisteredUser});


    }
    catch(error){
        res.status(400).json({success:false,error});
    }
    


}
const UpdateDetails=async(req,res)=>{
    const {donorId,status}=req.body;
    try{
    const donorData=await BloodUser.findOne({_id:donorId});
    if(donorData){
        donorData.status=status
        await donorData.save();
        res.status(200).json({success:true,message:'Mark as read Success'})
    }
}
catch(error){
    res.status(400).json({success:false,message:error});
}
 

}
export {RegisterBloodUser,fetchRegisteredUser,UpdateDetails};
