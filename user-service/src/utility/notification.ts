import Mailgen from "mailgen";
import nodemailer from "nodemailer";

interface AccessCodeResult {
  code: number;
  expiry: Date;
}

interface MailOptions {
  code?: number;
  token?: string;
  email: string;
  option: "ACCESS" | "PASSWORD";
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "duruobinnafranklin@gmail.com",
    pass: "jpdckrnfqfebcjcg",
  },
  tls: { rejectUnauthorized: false },
});

const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "User Service",
    link: "http://localhost:3000",
  },
});

export const GenerateAccessCode = (): AccessCodeResult => {
  const code: number = Math.floor(10000 + Math.random() * 900000);
  let expiry: Date = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { code, expiry };
};

export const SendVerificationCode = async ({
  code,
  token,
  email,
  option,
}: MailOptions): Promise<void> => {
  let response;

  if (option === "ACCESS" && code) {
    response = {
      body: {
        intro: `OTP: <b>${code}</b>`,
        outro: "Note that this code is valid for 30 minutes.",
      },
    };
  } else {
    response = {
      body: {
        intro: `Password: <b>https://localhost:${token}</b>`,
        outro: "Note that this link is valid for 30 minutes.",
      },
    };
  }

  const mail = MailGenerator.generate(response);

  const message = {
    from: `'User Service' <${process.env.EMAIL}>`,
    to: email,
    subject: "Authentication",
    html: mail,
  };

  try {
    await transporter.sendMail(message);
    console.log("Mail sent successfully");
  } catch (error) {
    throw new Error(error);
  }
};
