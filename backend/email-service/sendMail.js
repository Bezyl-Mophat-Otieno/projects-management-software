const nodemailer = require('nodemailer');


const config = {
  host : 'smtp.gmail.com',
  server:'gmail',
  port: 587,
  auth: {
      user:process.env.EMAIL,
      pass:process.env.EMAIL_PWD
  }

}

//creating  a transorter function

const createTransporter = (config)=>{

  return nodemailer.createTransport(config)
}

const sendMail = async (messageOptions)=>{
  const transporter = createTransporter(config)
  await transporter.verify()
  await transporter.sendMail(messageOptions,(err, info)=>{
      console.log('Here is when the email gets sent')
      console.log(info);
      console.log(err);
      return info;
  })

}

module.exports = {
  sendMail
};