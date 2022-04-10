const router = require("express").Router();
require("dotenv").config();
const transporter = require("../config/nodemailer.js");

const getDateTime = require("../function/datetime.js")();

router.post("/", (req, res) => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_ADMINS,
    subject: "Demande d'inscription",
    template: "demandeInscription",
    context: {
      abrev: req.body.abrev ?? "---",
      nom: req.body.nom ?? "---",
      email: req.body.email ?? "---",
      num: req.body.num ?? "---",
      site: req.body.site ?? "---",
      adresse: req.body.adresse ?? "---",
      pays: req.body.pays ?? "---",
      ville: req.body.ville ?? "---",
      frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
      confirmationUrl:
        (process.env.BACKEND_URL ?? "http://localhost:4000") +
        `/inscription/confirmation`,
      date: getDateTime,
    },
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

router.get("/confirmation", (req, res) => {
  const code = process.env.INSCRIPTION_CODE || "";
  const data = req.query;
  if (code != "" && data.code == process.env.INSCRIPTION_CODE) {
    res.send("Inscription confirmée");
  } else {
    res.send("Code erroné");
  }
});

module.exports = router;
