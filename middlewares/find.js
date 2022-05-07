"use strict";

const nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

const find_pw = (parameter) => {
    
}

const find_id = (parameter) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "20201012@vision.hoseo.edu",
            pass: "nskyrfzukrxsswrq"
        }
    });
    const mailOptions = {
        from: "20201012@vision.hoseo.edu",
        to: parameter.toEmail,
        subject: parameter.subject,
        text: parameter.text
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
        console.log(err);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    find_id,
    find_pw
}