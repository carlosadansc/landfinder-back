const nodemailer = require("nodemailer");
require("dotenv").config();
const { resetPasswordTemplate, confirmEmailTemplate } = require("../utils/MjmlTemplates");


exports.sendMailForgotPassword = async (email, token) => {
    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const htmlTemplate = resetPasswordTemplate(link);

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
            html: htmlTemplate,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

exports.sendConfirmEmail = async (email, token) => {
    const link = `${process.env.CLIENT_URL}/confirm-email?token=${token}`;
    const htmlTemplate = confirmEmailTemplate(link);

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
            from: '"Confirm email" <inddormx@gmail.com>',
            to: email,
            subject: "Confirm your email",
            html: htmlTemplate,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};