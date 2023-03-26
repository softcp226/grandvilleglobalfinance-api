const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();



const transporter2 = nodemailer.createTransport(
  smtpTransport({
    host: process.env.mail_host,
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    port: 465,
    auth: {
      user: process.env.company_mail,
      pass: process.env.password,
    },
  }),
);


// let transporter2 = nodemailer.createTransport({
//   service: "Gmail",
//   secure: false,

//   auth: {
//     user: "fintexaurum@gmail.com",
//     // pass: "desolidboy1",
//     pass: "nxnrbkgdbclgkawv",
//     // secure:false,
//   },
// });



let currentdate = new Date();
let datetime = `${currentdate.getFullYear()}-${
  currentdate.getMonth() + 1
}-${currentdate.getDate()} ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

let create_mail_options2 = (userInfo) => {
  return (mailOptions = {
    from: process.env.company_mail,
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever,
    subject: `LOAN REQUEST APPROVAL NOTIFICATION`,
    //   text:"just wanna know if this works",
    html: `
   <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Nunito&family=Roboto&display=swap"
  rel="stylesheet"
/>
<main    style="
    font-family: 'Nunito', sans-serif;
    font-family: 'Roboto', sans-serif;
    width: 100%;
    background-size: cover;
  "
>
 
<div style="text-align: center;">
    <img src="https://xerox-global.com/assets/images/logo'.png" style="width: 80px; text-align: center; margin: auto;" alt="Logo">
</div>

    <div class="head-txt">
<div class="head-txt">
      <h1 style="text-align: center; font-size: 16px; color: #009fed">
       XEROX GLOBAL LIMITED
      </h1>
      <h3 style="font-size: 15px;">LOAN REQUEST APPROVAL NOTIFICATION</h3>
    </div>

    <p class="sm-p">
      Dear ${userInfo.full_name} congratulations your request to get a loan of${userInfo.loan_amount}
      has been approved and fund has been deposited into your account.
    </p>
    <p class="sm-p">
You can easily withdraw your fund or continue to trade.
    </p>

    <p class="sm-p">
      incase you have any questions do not hesitate to contact us and we will
      reach out to you as soon as possible
    </p>
    <h1
      style="
        font-size: 18px;
        text-align: center;
        background: #eee;
        color: #009fed;
      "
    >
      XEROX GLOBAL LIMITED
    </h1>
    <p class="disclaimer" style="font-size: 12px; font-weight: bolder">
      Disclaimer: this message was automatically generated via xerox global limited
      secured channel,please do not reply to this message all correspondence
      should be addressed to xerox-global.com or your relationship officer
    </p>
  </div>
</main>
 `,
  });
};
module.exports = { create_mail_options2, transporter2 };
