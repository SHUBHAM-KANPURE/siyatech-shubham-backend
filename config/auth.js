require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');

const signInToken = (user) => {
    return jwt.sign(
        {
            _id: user?._id,
            username: user?.username,
            email: user?.email,
            address: user?.address,
            image: user?.image,
            role: user?.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        }
    );
};

const sendEmail = (email, generatePass, file, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: process.env.SERVICE,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });
        ejs.renderFile(file, message, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: process.env.MAIL_USERNAME,
                    to: email,
                    subject: subject,
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        return console.log(err);
                    } else {
                        res.send('Message %s sent: %s', info.messageId, info.response);
                        return
                    }
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signInToken,
    sendEmail
}