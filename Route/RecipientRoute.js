import express from "express";
import { recipientDetails } from "../Controller/RecipientController.js";
const recipientRouter=express.Router();
recipientRouter.post('/recipientdata',recipientDetails);
export default recipientRouter;