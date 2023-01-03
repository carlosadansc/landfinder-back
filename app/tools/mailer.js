const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, resetToken, id_user) => {

    //const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${id_user}`;
    const html = `<p>You requested for reset password, kindly use this <a href="${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${id_user}">link</a> to reset your password</p>`;

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "inddormx@gmail.com",
                pass: "znhrjgyatbvqxqwn",
            },
        });

        await transporter.sendMail({
            from: '"Forgot password" <inddormx@gmail.com>',
            to: email,
            subject: "Inddor Reset Password",
            html: html,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;