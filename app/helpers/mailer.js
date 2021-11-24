const nodemailer = require('nodemailer');
const config = require('../../config.json');

async function mailer(params) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: config.email,
            pass: config.pass
        }
    });
    console.log(params);
    var mailOptions = {
        from: "bar@example.com",
        to: params.email || '181012@students.au.edu.pk',
        subject: params.subject,
        text: params.message
    };

    return await transporter.sendMail(mailOptions);
    // return { message: "added sucessfully" };

}

module.exports = mailer;
