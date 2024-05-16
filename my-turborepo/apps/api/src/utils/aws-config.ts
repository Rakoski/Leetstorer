const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
require('dotenv').config();

const AWS_SES = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const sendPasswordResetEmail = async (email, resetToken) => {
    const params = {
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `You are receiving this email because you (or someone else) has requested a password reset 
                    for your account.\n\nPlease click the following link, or paste it into your browser to complete the 
                    process:\n\nhttps://leetstorer.com/reset-password/${resetToken}\n\nIf you did not request this, 
                    please ignore this email and your password will remain unchanged.`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `You are receiving this email because you (or someone else) has requested a password reset 
                    for your account.\n\nPlease click the following link, or paste it into your browser to complete the 
                    process:\n\nhttps://leetstorer.com/reset-password/${resetToken}\n\nIf you did not request this, 
                    please ignore this email and your password will remain unchanged.`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Password Reset'
            }
        },
        ReplyToAddresses: [],
        Source: process.env.VERIFIED_EMAIL_ADDRESS
    };

    try {
        const command = new SendEmailCommand(params);
        await AWS_SES.send(command);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export { sendPasswordResetEmail };

