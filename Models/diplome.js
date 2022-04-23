const mongoose = require("mongoose");

const diplomeModel = mongoose.Schema({
  etablissement_id: mongoose.Schema.Types.ObjectId,
  etudiant: mongoose.Schema.Types.ObjectId,
  intitule: String,
  date: { type: Date, default: Date.now() },
});

const Diplome = mongoose.model("Diplome", diplomeModel);

module.exports = Diplome;
