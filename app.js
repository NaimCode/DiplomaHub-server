//Importation
const express = require("express");
const cors = require("cors");
const InscriptionRouter = require("./routes/inscription");
const mongoose = require("mongoose");
const Etablissement = require("./Models/etablissement");
require("dotenv").config();
//Initialisation
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@diplomahub.9qjxa.mongodb.net/Primaire?retryWrites=true&w=majority`
  )
  .then((v) => console.log("Base de donnée en marche..."));
//Le port accordé au serveur
const PORT = 4000;

//Lancement du serveur
app.listen(PORT, () =>
  console.log(`Le serveur est en écoute sur le port ${PORT}`)
);

//Route par défaut
app.get("/", (req, res) => res.send("Serveur en marche!"));

//Activation des autres routers
app.use("/inscription", InscriptionRouter);

//test
app.get("/test", (req, res) => {
  const etablissement = new Etablissement({
    nom: "Université Ibn Tofail",
    email: "naimdevelopper@gmail.com",
  });
  // etablissement.save(function (err) {
  //   if (err) return handleError(err);
  //   // saved!
  //   res.send("saved");
  // });
  console.log(Etablissement.findById("625357fa4f522b33f672efcc"));
});
