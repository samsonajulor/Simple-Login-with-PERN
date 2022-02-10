import nodemailer from 'nodemailer';

let transporter:any;
const sendEmail = async (email: string, subject: string, message: string) => {
  //1. create a transporter
  if (process.env.NODE_ENV === 'production') {
    transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.OUTLOOK_USERNAME,
        pass: process.env.OUTLOOK_PASSWORD,
      },
  })
}
else if(process.env.NODE_ENV === 'development'){
  transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    logger: true,
  })


    //Activate in gmail "less secure app" option
  };

  
  //2. define the email options
  
  const mailOptions = {
    from: 'naheemadedokun@outlook.com',
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error:any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent');
    }
  })
};
export default sendEmail;




