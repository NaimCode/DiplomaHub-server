const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

require("dotenv").config();
const path = require("path");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("views/"),
};
transporter.use("compile", hbs(handlebarOptions));

module.exports = transporter;
