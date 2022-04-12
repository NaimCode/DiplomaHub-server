const Membre = require("../Models/membre");

const router = require("express").Router();
require("dotenv").config();

router.post("/", (req, res) => {
  const data = req.body;
  if (data.isMember) {
    Membre.findOne({ email: data.email }, (err, mbr) => {
      if (mbr) {
        if (mbr.password == data.password) {
          mbr.password = mbr.password;
          res.status(200).send(JSON.stringify(mbr));
        } else {
          res.status(400).json({ error: "Mot de passe invalide" });
        }
      } else {
        res.status(400).json({ error: "Email invalide" });
      }
    });
  } else {
    res
      .status(400)
      .json({ error: "Etudiant n'est pas pris en charge pour le moment" });
  }
});

module.exports = router;
