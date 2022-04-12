//Importation
const express = require("express");
const cors = require("cors");
const InscriptionRouter = require("./routes/inscription");
const ConnextionRouter = require("./routes/auth");
const { decrypt } = require("./function/crypto");
require("dotenv").config();
const mongoose = require("mongoose");
//Initialisation
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@diplomahub.9qjxa.mongodb.net/${process.env.MONGOOSE_DATABASE}?retryWrites=true&w=majority`
  )
  .then((v) => console.log("Base de donnée en marche..."))
  .catch(() => console.log("Impossible d'atteindre la base de donnée "));
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
app.use("/auth", ConnextionRouter);
