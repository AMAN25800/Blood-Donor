import nodemailer from 'nodemailer';

const sendMail = async (req, res) => {
    const { from, to, subject, text } = req.body;

    // Validation
    if (!to || !subject || !text || !from) {
        return res.status(400).json({ success: false, message: "All fields are required (from, to, subject, text)." });
    }

    try {
        // Configure the SMTP transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Change to your email provider if not Gmail
            auth: {
                user: 'shah.aman5772719@gmail.com', // Replace with your email
                pass: 'urks ayyf jrqm hyfn', // Replace with your email password
            },
        });

        // Email options
        const mailOptions = {
            from: `"${from} HOSPITAL" <your-email@gmail.com>`, // Display `from` name and use your email for authentication
            to,
            subject,
            text,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: `Email sent successfully to ${to}`,
            info,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email.',
            error: error.message,
        });
    }
};

export { sendMail };
