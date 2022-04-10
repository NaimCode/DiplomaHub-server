const router = require("express").Router();
const transporter = require("../config/nodemailer.js");
router.post("/", (req, res) => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL_ADMINS,
    subject: "Demande d'inscription",
    html: "<h1>Naim</h1>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send({ message: "Erreur du server" });
    } else {
      res.status(200).send({
        abrev: req.body.abrev,
        nom: req.body.nom,
        email: req.body.email,
        num: req.body.num,
        site: req.body.site,
        adresse: req.body.adresse,
        pays: req.body.pays,
        ville: req.body.ville,
      });
    }
  });
});

module.exports = router;
