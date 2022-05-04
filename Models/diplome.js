const mongoose = require("mongoose");

const diplomeModel = mongoose.Schema({
  etablissement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etablissements",
  },
  etudiant: { type: mongoose.Schema.Types.ObjectId, ref: "Etudiants" },
  intitule: String,
  doc: String,
  chainId: Number,
  blockHash: String,
  blockNumber: Number,
  hash: String,
  date: { type: Date, default: Date.now() },
});

const Diplome = mongoose.model("Diplomes", diplomeModel);

module.exports = Diplome;
