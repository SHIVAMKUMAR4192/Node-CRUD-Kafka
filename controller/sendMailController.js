// const nodemailer = require("nodemailer");

// const sendMail = async (req, res) => {
//     let testAccount = await nodemailer.createTestAccount();

//     const transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: 'cortney.king@ethereal.email',
//             pass: 'wgVT6rpJ3YmjjaTbG6'
//         }
//     });

//     let info = await transporter.sendMail({
//         from: '"shivam kumar" shivamkumar91social.com',
//         to: 'jiteshkhatri@91social.com',
//         subject: 'Hello Khatri',
//         text: 'This is to inform you that the holiday you have chosen for Christmas is approved!'
//     });

//     console.log("Message sent", info.messageId);

//     res.json(info);
// }

// module.exports = sendMail;

const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        let details = {
            from: process.env.GMAIL_USER,
            to: '"jiteshkhatri@91social.com""saurabh@91social.com""abdul@91social.com"',
            subject: 'leave grant mail',
            text: 'This is to inform you that the holiday you have chosen for Christmas is approved!',
        };

        let info = await transporter.sendMail(details);
        console.log('Message sent: %s', info.messageId);

        res.json(info);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = sendMail;
