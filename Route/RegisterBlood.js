import express from "express";
import { RegisterBloodUser,fetchRegisteredUser,UpdateDetails } from "../Controller/SaveUserFormController.js";
const BloodRouter=express.Router();
BloodRouter.post('/save-user',RegisterBloodUser);
BloodRouter.get('/fetch-donor',fetchRegisteredUser);
BloodRouter.post('/update-donor-status',UpdateDetails);

export default BloodRouter;
