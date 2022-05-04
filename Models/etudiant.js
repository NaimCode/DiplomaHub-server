const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../function/crypto");

const etudiantModel = new mongoose.Schema({
  email: String,
  nom: String,
  prenom: String,
  password: {
    type: String,
    default: encrypt,
    get: (v) => decrypt(v),
  },
  date: { type: Date, default: Date.now },
});

const Etudiant = mongoose.model("Etudiants", etudiantModel);

module.exports = Etudiant;
