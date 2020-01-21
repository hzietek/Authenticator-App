const nodemailer = require('nodemailer');

const sendCode = (code, email) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let mailInfo = {
        from: process.env.MAIL,
        to: email,
        subject: 'Authenticator Application Verify Code',
        html: `<div style='font-size: 30px; text-align: center;'>YOUR AUTHENTICATION CODE: <div style='border: 2px solid #000000'><b>${code}</div></b></div>`
    }

    transporter.sendMail(mailInfo, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Email sent!");
        }
    });
}

module.exports = sendCode;