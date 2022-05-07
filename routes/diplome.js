const Diplome = require("../Models/diplome");

const router = require("express").Router();
require("dotenv").config();

router.get("/getAll/:eid", (req, res) => {
  Diplome.find({ etablissement: req.params.eid })
    .populate("etudiant")
    .exec((err, ds) => {
      if (ds) res.status(200).send(ds);
      else res.status(200).send([]);
    });
});

router.get("/get/all/:id", (req, res) => {
  Diplome.find({ etudiant: req.params.id })
    .populate("etablissement")
    .exec((err, ds) => {
      if (ds) res.status(200).send(ds);
      else res.status(200).send([]);
    });
});
module.exports = router;
