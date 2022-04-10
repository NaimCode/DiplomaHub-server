const mongoose = require("mongoose");
const crypto = require("crypto");
const etablissementModel = new mongoose.Schema({
  abrev: String,
  logo: String, // String is shorthand for {type: String}
  nom: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  num: String,
  emplacement: {
    pays: String,
    ville: String,
    adresse: String,
  },
  dateInscription: { type: Date, default: Date.now },
});

const Etablissement = mongoose.model("Etablissement", etablissementModel);

module.exports = Etablissement;
