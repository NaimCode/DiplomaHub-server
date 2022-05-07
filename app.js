//Importation
const express = require("express");
const cors = require("cors");
const InscriptionRouter = require("./routes/inscription");
const ConnextionRouter = require("./routes/auth");
const EtablissementRouter = require("./routes/etablissement");
const MembreRouter = require("./routes/membre");
const RoleRouter = require("./routes/role");
const DiplomeRouter = require("./routes/diplome");
const MesEtudiantsRouter = require("./routes/mesEtudiants");
const CertificationRouter = require("./routes/certification");
const { decrypt } = require("./function/crypto");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
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

app.listen(PORT, () =>
  console.log(`Le serveur est en écoute sur le port ${PORT}`)
);

app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));

app.use("/inscription", InscriptionRouter);
app.use("/auth", ConnextionRouter);
app.use("/membre", MembreRouter);
app.use("/etablissement", EtablissementRouter);
app.use("/role", RoleRouter);
app.use("/diplome", DiplomeRouter);
app.use("/mesEtudiants", MesEtudiantsRouter);
app.use("/certification", CertificationRouter);
