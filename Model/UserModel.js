import mongoose from "mongoose";
const usermodel=new mongoose.Schema({
    hospitalName:{type:String,required:true},
    lisenceNumber:{type:String,required:true},
    ownerName:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
})
const userModel=mongoose.model("user",usermodel);
export default userModel;