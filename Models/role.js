const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../function/crypto");

const roleModel = new mongoose.Schema({
  etablissement_id: mongoose.Schema.Types.ObjectId,
  intitule: String,
  description: String,
  transaction: [String],
  membre: [String],
  etudiant: [String],
  role: [String],
  date: { type: Date, default: Date.now },
});

const Role = mongoose.model("Role", roleModel);

module.exports = Role;
