const Cryptr = require("cryptr");
const crypto = require("crypto");
require("dotenv").config();

const cryptr = new Cryptr(process.env.CRYPTAGE_KEY);

const encrypt = () => cryptr.encrypt(crypto.randomBytes(4).toString("hex"));
const decrypt = (hash) => cryptr.decrypt(hash);
module.exports = { encrypt, decrypt };
