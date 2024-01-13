const twilio = require("twilio");
const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');
require("dotenv").config();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const verifySid = process.env.VERIFYSID;

const client = twilio(accountSid, authToken);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: { rejectUnauthorized: false }
});

const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "UpTrust Builders",
        link: process.env.BASE_URL
    }
});

module.exports.GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

    return { code, expiry };
};

module.exports.SendVerificationCode = async (code, phone) => {
    try {
        const verification = await client.verify.v2.services(verifySid)
            .verifications.create({
                to: phone,
                channel: 'sms',
            });
        
        console.log("verification.status", verification);
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error;
    }
};

module.exports.sendMail = async (code, email, name) => {
    const response = {
        body: {
            name: `${name}`,
            intro: `OTP: <b>${code}</b>`,
            outro: 'Note that this code is valid for 10 minutes.',
        }
    }

    const mail = MailGenerator.generate(response);

    const message = {
        from: `'UpTrust Builders' <${process.env.EMAIL}>`,
        to: email,
        subject: 'Authentication',
        html: mail
    };

    transporter.sendMail(message)
        .then(() => console.log('Mail sent successfully'))
        .catch(error => { throw new Error(error); });
};



