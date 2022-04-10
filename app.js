//Importation
const express = require("express");
const cors = require("cors");
const InscriptionRouter = require("./routes/inscription");

//Initialisation
const app = express();
app.use(cors());
app.use(express.json());

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
