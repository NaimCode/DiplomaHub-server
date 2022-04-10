import { randomBytes, pbkdf2Sync } from "crypto";
require("dotenv").config();
const password = process.env.CRYPTAGE_KEY;
const cryptage = pbkdf2Sync(
  password,
  randomBytes(8).toString("hex"),
  1000,
  64,
  "sha512"
).toString("hex");

module.exports = { cryptage };
