const Membre = require("../Models/membre");
const Etudiant = require("../Models/etudiant");
const nodemailer = require("nodemailer");
const router = require("express").Router();
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
router.post("/", function (req, res) {
  const data = req.body;
  if (data.isMember) {
    Membre.findOne({ email: data.email }, (err, mbr) => {
      if (mbr) {
        if (mbr.password == data.password) {
          mbr.password = mbr.password;
          res.status(200).json({ user: mbr, isMembre: true });
        } else {
          res.status(400).json({ error: "Mot de passe invalide" });
        }
      } else {
        res.status(400).json({ error: "Email invalide" });
      }
    });
  } else {
    Etudiant.findOne({ email: data.email })
      .then((e) => {
        if (e) {
          if (e.password == data.password) {
            e.password = e.password;
            res.status(200).json({ user: e, isMembre: false });
          } else {
            res.status(400).json({ error: "Mot de passe invalide" });
          }
        } else res.status(400).json({ error: "Email invalide" });
      })
      .catch((err) => res.status(400).json({ error: "Erreur du serveur" }));
  }
});

router.post("/contact/:id", (req, res) => {
  let emails;
  switch (req.params.id) {
    case 0:
      emails = process.env.EMAIL_ADMINS_BUG;
      break;
    case 1:
      emails = process.env.EMAIL_ADMINS_SUGGEST;
      break;
    case 2:
      emails = process.env.EMAIL_ADMINS_MODIF;
      break;
    default:
      emails = process.env.EMAIL_ADMINS_BUG;
      break;
  }

  var mailOptions2 = {
    from: process.env.EMAIL,
    to: emails,
    subject:
      req.params.id === 0
        ? "Signalisation d'un bug"
        : req.params.id === 1
        ? "Suggestion"
        : "Demande de modification",
    text:
      `${req.body.nom ?? "Admin"} ${req.body.prenom ?? ""} (${
        req.body.email
      })` +
      "\n" +
      req.body.text,
  };

  transporter.sendMail(mailOptions2, async function (error, info) {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
