const mongoose = require("mongoose");

const etudiantModel = new mongoose.Schema({
  email: String,
  nom: String,
  prenom: String,
  etablissement_id: mongoose.Schema.Types.ObjectId,
  diplome: mongoose.Schema.Types.ObjectId,
  doc: {
    hash: String,
    link: String,
  },
  date: { type: Date, default: Date.now },
});

const MesEtudiants = mongoose.model("Mes Etudiants", etudiantModel);

module.exports = MesEtudiants;
