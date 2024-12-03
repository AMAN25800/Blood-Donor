import recipientData from "../Model/RecipientModel.js";
import patientData from "../Model/PatientModel.js";
import twilio from "twilio";
import nodemailer from "nodemailer";
import 'dotenv/config'

// Twilio credentials
const accountSid = process.env.ACCOUNTSID; // Replace with your Twilio Account SID
const authToken = process.env.AUTHTOKEN; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shah.aman5772719@gmail.com", // Replace with your email
    pass: "urks ayyf jrqm hyfn", // Replace with your email password or app password
  },
});

// Function to send SMS
const sendSMS = async (donor, recipientName) => {
  try {
    return await client.messages.create({
      body: `Hello ${donor.PatientName}, I hope you are fine. Urgent blood is needed for recipient ${recipientName}. Please help us save their life by donating blood. For queries, contact +917000577419.`,
      from: "+19549511315", // Replace with your Twilio phone number
      to: donor.PhoneNumber, // Assuming donor.PhoneNumber contains the phone number
    });
  } catch (error) {
    console.error(`Error sending SMS to ${donor.PhoneNumber}:`, error);
    throw new Error(`Failed to send SMS to ${donor.PhoneNumber}`);
  }
};

// Function to send Email
const sendEmail = async (name,donor, recipientName) => {
  try {
    return await transporter.sendMail({
      from: '"Blood Donor Service" <your-email@gmail.com>', // Replace with your email
      to: donor.email, // Assuming donor.Email contains the email address
      subject: `${name} HOSPITAL - UREGNT BLOOD DONATION`,
      text: `Hello ${donor.PatientName},\n\nAn urgent blood donation is needed for recipient ${recipientName}. Please help us save a life. Contact +917000577419 for more details.\n\nThank you for your generosity.`,
    });
  } catch (error) {
    console.error(`Error sending email to ${donor.Email}:`, error);
    throw new Error(`Failed to send email to ${donor.Email}`);
  }
};

// Main recipientDetails function
const recipientDetails = async (req, res) => {
  const {
    hospitalName,
    recipientName,
    recipientAge,
    recipientGender,
    recipientEmail,
    recipientPhone,
    recipientBlood,
  } = req.body;

  try {
    // Fetch donors from the patientData model based on blood group
    const donors = await patientData.find({ BloodGroup: recipientBlood });

    if (donors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No donors found for the specified blood group",
      });
    }

    // Save recipient data to the database
    const newRecipient = new recipientData({
     recipientName,
     recipientAge,
     recipientBlood,
     recipientEmail,
     recipientGender,
     recipientPhone,
    });

    await newRecipient.save();

    // Create SMS and email promises
    const smsPromises = donors.map((donor) => sendSMS(donor, recipientName));
    const emailPromises = donors.map((donor) => sendEmail(hospitalName,donor, recipientName));

    // Wait for all SMS and emails to complete
    const smsResults = await Promise.allSettled(smsPromises);
    const emailResults = await Promise.allSettled(emailPromises);

    // Log results for debugging
    console.log("SMS Results:", smsResults);
    console.log("Email Results:", emailResults);

    return res.status(200).json({
      success: true,
      message: "Messages sent successfully and recipient data saved",
      smsResults,
      emailResults,
    });
  } catch (error) {
    console.error("Error in sending blood request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { recipientDetails };
