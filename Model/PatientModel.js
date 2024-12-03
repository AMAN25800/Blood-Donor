import mongoose from "mongoose";
const patientModel=new mongoose.Schema({
    PatientName:{type:String,required:true},
    Age:{type:Number,required:true},
    Gender:{type:String,required:true},
    PhoneNumber:{type:String,required:true},
    email:{type:String,required:true},
    Address:{type:String,required:true},
    BloodGroup:{type:String,required:true},


})
const patientData=mongoose.models.patient || mongoose.model("patient",patientModel);
export default patientData;