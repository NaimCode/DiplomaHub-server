const { json } = require("express");
const Etablissement = require("../Models/etablissement");

const router = require("express").Router();
require("dotenv").config();

router.get("/:id", (req, res) => {
  Etablissement.findById(req.params.id, (err, e) => {
    if (e) res.status(200).send(JSON.stringify(e));
    if (err) res.status(400).send({ error: "Etablissement indisponible" });
  });
});

router.get("/etudiants/:id", (req, res) => {
  Etablissement.findById(req.params.id, (err, e) => {
    if (e) res.status(200).send(JSON.stringify(e));
    if (err) res.status(400).send({ error: "Etablissement indisponible" });
  });
});

module.exports = router;
