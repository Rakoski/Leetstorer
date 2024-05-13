const AWS = require('aws-sdk')
require('dotenv').config()

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
}

const AWS_SES = new AWS.SES(SES_CONFIG)

const sendPasswordResetEmail = async (email: string, resetToken: string) => {
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
        await AWS_SES.sendEmail(params).promise();
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export { sendPasswordResetEmail };
