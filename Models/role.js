const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../function/crypto");

const roleModel = new mongoose.Schema({
  etablissement_id: mongoose.Schema.Types.ObjectId,
  intitule: String,
  description: String,
  etablissement: [String],
  membre: [String],
  etudiant: [String],
  role: [String],
});

const Role = mongoose.model("Role", roleModel);

module.exports = Role;
