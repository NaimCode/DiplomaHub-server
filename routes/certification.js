const transporter = require("../config/nodemailer.js");
const Diplome = require("../Models/diplome");
const Etudiant = require("../Models/etudiant");
const MesEtudiants = require("../Models/mesEtudiant");

const router = require("express").Router();

router.get("/:id", (req, res) => {
  Diplome.findOne({ hash: req.params.id })
    .populate("etablissement")
    .populate("etudiant")
    .exec()
    .then((d) => {
      if (d) res.status(200).send(JSON.stringify(d));
      else res.sendStatus(400);
    })
    .catch((err) => res.sendStatus(400));
});

router.post("/", async (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const intitule = req.body.intitule;
  const etudiant = req.body.etudiant;
  const doc = req.body.doc;
  const nomEtablissement = req.body.nomEtablissement;
  const etablissement = req.body.etablissement;
  const hash = req.body.hash;
  const chainId = req.body.chainId;
  const blockHash = req.body.blockHash;
  const blockNumber = req.body.blockNumber;
  Etudiant.findOne({ email })
    .then(async (e) => {
      if (e) {
        const d = Diplome({
          etudiant: e._id,
          etablissement,
          intitule,
          doc,
          hash,
          chainId,
          blockHash,
          blockNumber,
        });
        await d.save();
        await MesEtudiants.findByIdAndUpdate(etudiant, { diplome: d._id });
        var mailOptions2 = {
          from: process.env.EMAIL,
          to: e.email,
          subject: "Diplôme certifié",
          template: "ajoutdiplome",
          context: {
            nomEtudiant: e.nom + " " + e.prenom,
            nom: nomEtablissement,
            hash,
            frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
          },
        };

        transporter.sendMail(mailOptions2, async function (error, info) {
          if (error) {
            console.log(error);
            res.status(400).send("error");
          } else {
            res.status(200).json({ hash });
          }
        });
      } else {
        const e = Etudiant({ email, nom, prenom });
        await e.save();
        const d = Diplome({
          etudiant: e._id,
          etablissement,
          intitule,
          doc,
          hash,
          chainId,
          blockHash,
          blockNumber,
        });
        await d.save();
        await MesEtudiants.findByIdAndUpdate(etudiant, { diplome: d._id });
        var mailOptions = {
          from: process.env.EMAIL,
          to: e.email,
          subject: "Nouveau compte",
          template: "nouveauEtudiant",
          context: {
            nomEtudiant: e.nom + " " + e.prenom,
            email: e.email,
            nom: nomEtablissement,
            password: e.password,
            frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:3000",
          },
        };

        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log(error);
            await transporter.sendMail(mailOptions);
          } else {
            var mailOptions2 = {
              from: process.env.EMAIL,
              to: e.email,
              subject: "Diplôme certifié",
              template: "ajoutdiplome",
              context: {
                nomEtudiant: e.nom + " " + e.prenom,
                nom: nomEtablissement,
                hash,
                frontendUrl:
                  process.env.FRONTEND_URL ?? "http://localhost:3000",
              },
            };

            transporter.sendMail(mailOptions2, async function (error, info) {
              if (error) {
                console.log(error);
                res.status(400).send("error");
              } else {
                res.status(200).json({ hash });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error");
    });
});
module.exports = router;
