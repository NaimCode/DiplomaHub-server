const { json } = require("express");
const transporter = require("../config/nodemailer");
const Etablissement = require("../Models/etablissement");
const Membre = require("../Models/membre");

const router = require("express").Router();
require("dotenv").config();

router.get("/:id", (req, res) => {
  Membre.findById(req.params.id, (err, mbr) => {
    if (mbr) {
      mbr.password = mbr.password;
      res.status(200).send(JSON.stringify(mbr));
    }
    if (err) res.status(400).send({ error: "Membre indisponible" });
  });
});
router.put("/update/:id", async (req, res) => {
  console.log(req.params.id);
  Membre.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (user) {
      Object.assign(user, req.body);

      res.status(200).send(JSON.stringify(user));
    } else res.sendStatus(400);
  });
});

router.post("/add", (req, res) => {
  Membre.findOne({ email: req.body.email }, (err, mbr) => {
    if (mbr) res.status(404).json({ error: "Email déjà utilisé" });
    else {
      const m = new Membre(req.body);
      m.save().then(async (mbr) => {
        const etablissement = await Etablissement.findById(
          mbr.etablissement_id
        );
        var mailOptions = {
          from: process.env.EMAIL,
          to: mbr.email,
          subject: "Nouveau Membre",
          template: "membreCreer",
          context: {
            password: mbr.password,
            nom: etablissement.nom,
            membreNom: mbr.nom + " " + mbr.prenom,
            email: mbr.email,
            frontendUrl:
              (process.env.FRONTEND_URL ?? "http://localhost:3000") + "/auth",
          },
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.status(404).json({ error: "Erreur du server" });
          } else {
            res.sendStatus(200);
          }
        });
      });
    }
  });
});
module.exports = router;
