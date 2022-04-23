const { json } = require("express");
const Membre = require("../Models/membre");
const Role = require("../Models/role");

const router = require("express").Router();
require("dotenv").config();

router.post("/add", (req, res) => {
  const m = new Role(req.body);
  m.save().then((r) => {
    if (r) res.status(200).send(JSON.stringify(r));
    else res.sendStatus(404);
  });
});
router.get("/getAll/:eId", (req, res) => {
  Role.find({ etablissement_id: req.params.eId }, (err, r) => {
    if (err) res.sendStatus(404);
    else res.status(200).send(r);
  });
});
router.put("/update/:eId", (req, res) => {
  Role.findByIdAndUpdate(req.params.eId, req.body, (err) => {
    if (!err) res.sendStatus(200);
    else res.sendStatus(400);
  });
});
router.delete("/delete/:id", (req, res) => {
  Role.findByIdAndDelete(req.params.id, (err, r) => {
    if (err) res.status(404).send([]);
    else res.status(200);
  });
});
module.exports = router;
