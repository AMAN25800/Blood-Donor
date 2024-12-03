import mongoose from "mongoose";
const userFormData=new mongoose.Schema({
    SourceMail:{type:String,required:true},
    userName:{type:String,required:true},
    userAge:{type:String,required:true},
    userPhone:{type:String,required:true},
    BloodGroup:{type:String,required:true},
    userAddress:{type:String,required:true},
    status:{type:String,required:true},
})
const BloodUser=mongoose.model("BloodUser",userFormData);
export default BloodUser;