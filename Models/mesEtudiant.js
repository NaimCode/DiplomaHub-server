const mongoose = require("mongoose");

const etudiantModel = new mongoose.Schema({
  email: String,
  nom: String,
  prenom: String,
  diplome: mongoose.Schema.Types.ObjectId,
  etablissement_id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, default: Date.now },
});

const MesEtudiants = mongoose.model("Mes Etudiants", etudiantModel);

module.exports = MesEtudiants;
