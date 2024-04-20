import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

type MailParamsType = {
  email: string;
  emailType: string;
  userId: string;
};

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: MailParamsType) => {
  try {
    const hashedToken = await bcryptjs.hash(userId, 10);
    const expiryTime = Date.now() + 3600000;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: expiryTime,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpires: expiryTime,
        },
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "140376ded22581",
        pass: "f101ad3c94244d",
      },
    });
    const mailOptions = {
      from: "badaruddinomar2403@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.CLIENT_URL
      }/verifyEmail?token=${hashedToken}">here</a></p> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } <br/>
      or copy and paste the link below in your browser. <br/> ${
        process.env.CLIENT_URL
      }/verifyEmail?token=${hashedToken}
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
