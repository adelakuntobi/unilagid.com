import nodemailer from 'nodemailer'

const config = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
}

type Config = { // defined somewhere inside `mysql` library
  host: string,
  username: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string
}



const sendEmail = async ({ to, subject, text, html }: {to:any, subject:any, text:any, html:any}
  ) => {
  const transporter = nodemailer.createTransport(config as unknown as Config)
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });

  const emailOptions = {
    from: `Unilag Create ID Card <test@example.com>`,
    to,
    subject,
    text,
    html,
  };

  // Sending email
  transporter.sendMail(emailOptions, (err?:any, info?:any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;