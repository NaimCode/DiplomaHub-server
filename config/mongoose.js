const mongoose = require("mongoose");

require("dotenv").config();

const DATABASE = (query, error) =>
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGOOSE_USER}:/${process.env.MONGOOSE_PASSWORD}@diplomahub.9qjxa.mongodb.net/Database1?retryWrites=true&w=majority`
    )
    .then(query)
    .catch(error);

module.exports = DATABASE;
