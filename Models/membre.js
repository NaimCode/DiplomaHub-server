const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../function/crypto");

const membreModel = new mongoose.Schema({
  nom: String,
  prenom: String,
  avatar: String,
  password: {
    type: String,
    default: encrypt,
    get: (v) => decrypt(v),
  },
  email: { type: String, required: true, unique: true },
  etablissement_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Etablissements",
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});

const Membre = mongoose.model("Membre", membreModel);

module.exports = Membre;
