import mongoose from 'mongoose';
const RecipientModel=new mongoose.Schema({
    recipientName:{type:String,required:true},
    recipientAge:{type:String,required:true},
    recipientGender:{type:String,required:true},
    recipientEmail:{type:String,required:true},
    recipientPhone:{type:Number,required:true},
    recipientBlood :{type:String,required:true},
})
const recipientData=mongoose.model('recipient',RecipientModel);
export default recipientData;