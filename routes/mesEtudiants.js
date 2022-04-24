const { json } = require("express");
const Etablissement = require("../Models/etablissement");
const MesEtudiants = require("../Models/mesEtudiant");

const router = require("express").Router();
require("dotenv").config();

router.get("/getAll/:id", (req, res) => {
  MesEtudiants.find({ etablissement_id: req.params.id })
    .sort("-date")
    .exec((err, e) => {
      if (e) res.status(200).send(JSON.stringify(e));
      if (err) res.status(200).send([]);
    });
});
router.delete("/deleteAll/:id", (req, res) => {
  MesEtudiants.deleteMany({ etablissement_id: req.params.id })
    .then((v) => res.sendStatus(200))
    .catch((v) => res.sendStatus(400));
});
router.delete("/delete/:id", (req, res) => {
  MesEtudiants.findByIdAndDelete(req.params.id)
    .then((v) => res.sendStatus(200))
    .catch((v) => res.sendStatus(400));
});
router.post("/add", (req, res) => {
  MesEtudiants(req.body)
    .save()
    .then((e) => {
      if (e) res.status(200).send(JSON.stringify(e));
      else res.sendStatus(400);
    });
});

router.post("/addAll", (req, res) => {
  MesEtudiants.insertMany(req.body)
    .then(function (list) {
      res.status(200).json(list); // Success
    })
    .catch(function (error) {
      res.sendStatus(400); // Failure
    });
});

module.exports = router;
