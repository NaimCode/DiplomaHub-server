const Membre = require("../Models/membre");
const Etudiant = require("../Models/etudiant");
const router = require("express").Router();
require("dotenv").config();

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

module.exports = router;
