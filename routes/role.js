const { json } = require("express");
const Role = require("../Models/role");

const router = require("express").Router();
require("dotenv").config();

// router.get("/:id", (req, res) => {
//   Membre.findById(req.params.id, (err, mbr) => {
//     if (mbr) {
//       mbr.password = mbr.password;
//       res.status(200).send(JSON.stringify(mbr));
//     }
//     if (err) res.status(400).send({ error: "Membre indisponible" });
//   });
// });
// router.put("/update/:id", async (req, res) => {
//   Membre.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//     if (user) {
//       Object.assign(user, req.body);

//       res.status(200).send(JSON.stringify(user));
//     } else res.sendStatus(400);
//   });
// });

router.post("/add", (req, res) => {
  console.log(req.body);
  const m = new Role(req.body);
  m.save().then((r) => {
    if (r) res.status(200).send(JSON.stringify(r));
    else res.sendStatus(404);
  });
});
router.get("/getAll/:eId", (req, res) => {
  Role.find({ etablissement_id: req.params.eId }, (err, r) => {
    if (err) res.sendStatus(404);
    else res.status(200).json(JSON.stringify(r));
  });
});
router.delete("/delete/:id", (req, res) => {
  Role.findByIdAndDelete(req.params.id, (err, r) => {
    console.log(r);
    if (err) res.status(404).send([]);
    else res.status(200);
  });
});
module.exports = router;
