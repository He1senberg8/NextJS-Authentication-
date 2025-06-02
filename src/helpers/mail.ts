import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) =>{
    try {
        const hashedToken = await bcrypt.hash(userId.toString(),10);
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken : hashedToken,
                verifyTokenExpiry : Date.now() + 3600000 // 1 hour
            })
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken : hashedToken,
                forgotPasswordTokenExpiry : Date.now() + 3600000 // 1 hour
            })
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b6c32a14a3abb1",
    pass: "e260c4d7bfa334"
  }
});
         const mailOptions = {
            from : "nathpallab2004@gmail.com",
            to : email,
            subject : emailType === "VERIFY" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your emai" : "reset your password"}.</p>`
         }

         const mailResponse = await transport.sendMail(mailOptions);
         return mailResponse;

    } catch (error : any) {
        console.log(error.message);
    }
}
