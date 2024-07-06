const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const { EMAIL, PASSWORD } = require("../temp.js");

router.post("/signup", async (req, res, next) => {
  try {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    let message = {
      from: "Sender Name <sender@example.com>",
      to: "Recipient <recipient@example.com>",
      subject: "Nodemailer is unicode friendly ✔",
      text: "Hello to myself!",
      html: "<p><b>Hello</b> to myself!</p>",
    };
    const info = await transporter.sendMail(message);
    return res.status(200).json({
      message: "succesfully signup",
      info,
      prievew: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
router.post("/getbill", (req, res, next) => {
  const config = {
    serice: "gmail",
    auth: {
      auth: "",
      apss: "",
    },
  };
  nodemailer.createTransport(config);
  console.log(EMAIL);
  return res
    .status(200)
    .json({ message: "succesfully got bill !...", EMAIL, PASSWORD });
});
module.exports = router;
