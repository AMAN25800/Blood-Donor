import express from 'express';
import cors from 'cors';
import { connectDB } from './database/db.js';
import userRouter from './Route/userRoute.js';
import patient from './Route/PatientDataRoute.js';
import recipientRouter from './Route/RecipientRoute.js';
import BloodRouter from './Route/RegisterBlood.js';
import bodyParser from 'body-parser';
import router from './Route/EmailRoute.js';
const app=express();    /* basic setup*/
const port=process.env.port || 8000;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
connectDB();
app.use('/',userRouter)
app.use('/',patient)
app.use('/',router)
app.use('/',recipientRouter)
app.use('/',BloodRouter)
app.get("/", (req, res) => {
  
  
    res.send("API is working");  
  
  
   
  }); 
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  /* basic setup ends here */
