const router = require("express").Router();
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = require("../config/nodemailer.js");
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("views/"),
};
transporter.use("compile", hbs(handlebarOptions));
router.post("/", (req, res) => {
  console.log("inscription...");
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_ADMINS,
    subject: "Demande d'inscription",
    template: "demandeInscription",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Erreur du server" });
    } else {
      res.status(200).send({
        abrev: req.body.abrev,
        nom: req.body.nom,
        email: req.body.email,
        num: req.body.num,
        site: req.body.site,
        adresse: req.body.adresse,
        pays: req.body.pays,
        ville: req.body.ville,
      });
    }
  });
});

module.exports = router;
