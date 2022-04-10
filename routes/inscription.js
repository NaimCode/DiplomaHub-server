const router = require("express").Router();
require("dotenv").config();
const transporter = require("../config/nodemailer.js");
const database = require("../config/mongoose");
const Etablissement = require("../Models/etablissement.js");
const Membre = require("../Models/membre.js");
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
    Etablissement.findOne({ email: data.email }, (err, e) => {
      if (e) {
        res.send(
          `Impossible d'inscription l'établissement ${data.nom}, car l'email ${data.email} existe déjà`
        );
      } else {
        delete data.code;
        const e = Etablissement(data);
        e.save().then((savedDoc) => {
          if (savedDoc === e) {
            Membre({
              email: savedDoc.email,
              etablissement_id: savedDoc._id,
            })
              .save()
              .then((mbr) => {
                var mailOptions = {
                  from: process.env.EMAIL,
                  to: mbr.email,
                  subject: "Inscription réussie",
                  template: "inscriptionReussi",
                  context: {
                    password: mbr.password,
                    nom: savedDoc.nom,
                    email: mbr.email,
                    frontendUrl:
                      (process.env.FRONTEND_URL ?? "http://localhost:3000") +
                      "/auth",
                  },
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    res.status(500).send({ message: "Erreur du server" });
                  } else {
                    res.send(
                      `Inscription confirmée pour l'établissement ${savedDoc.nom}`
                    );
                  }
                });
              });
          }
        });
      }
    });
  } else {
    res.send("Code erroné");
  }
});

router.get("/test", (req, res) => {
  Etablissement.findById("625357fa4f522b33f672efcc", (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", docs);
    }
  });
});
module.exports = router;
