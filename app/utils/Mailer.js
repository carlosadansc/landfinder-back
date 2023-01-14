const nodemailer = require("nodemailer");
require("dotenv").config();
const { resetPasswordTemplate } = require("../utils/MjmlTemplates");


exports.sendMailForgotPassword = async (email, token, id_user = 1) => {
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