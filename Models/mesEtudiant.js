const mongoose = require("mongoose");

const etudiantModel = new mongoose.Schema({
  email: String,
  nom: String,
  prenom: String,
  etablissement_id: mongoose.Schema.Types.ObjectId,
  diplome: { type: mongoose.Schema.Types.ObjectId, ref: "Diplomes" },
  hash: String,
  intitule: String,
  date: { type: Date, default: Date.now },
});

const MesEtudiants = mongoose.model("Mes Etudiants", etudiantModel);

module.exports = MesEtudiants;
