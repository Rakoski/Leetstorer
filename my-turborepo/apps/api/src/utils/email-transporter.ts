import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.AWS_SMTP_ENDPOINT,
    port: process.env.AWS_SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.AWS_SMTP_USERNAME,
        pass: process.env.AWS_SMTP_PASSWORD,
    }
});

export default transporter;