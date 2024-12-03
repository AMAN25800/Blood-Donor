import patientData from "../Model/PatientModel.js";

const SaveData = async (req, res) => {
    const { PatientName, Age, Gender, PhoneNumber, email, Address, BloodGroup } = req.body;

    try {
        // Check if a record with the same email already exists
        const isExist = await patientData.findOne({ email });

        if (isExist) {
            return res.status(400).json({ success: false, message: 'Patient data already exists.' });
        }

        // Create a new record if it doesn't exist
        const newPatient = new patientData({
            PatientName,
            Age,
            Gender,
            PhoneNumber,
            email,
            Address,
            BloodGroup,
        });

        await newPatient.save();
        res.status(201).json({ success: true, message: 'Feedback registered successfully.' });
    } catch (error) {
        console.error('Error saving patient data:', error);
        res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
            error: error.message,
        });
    }
};

export { SaveData };
