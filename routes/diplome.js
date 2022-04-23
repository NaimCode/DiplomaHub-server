const Diplome = require("../Models/diplome");

const router = require("express").Router();
require("dotenv").config();

router.get("/getAll/:eid", (req, res) => {
  Diplome.find({ etablissement_id: req.params.eid }, (ds) => {
    console.log(ds);
    if (ds) res.status(200).send(ds);
    else res.status(200).send([]);
  });
});
module.exports = router;
