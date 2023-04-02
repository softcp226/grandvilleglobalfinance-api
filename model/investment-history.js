const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to transaction database");
require("./investment-package");

const Investment_history_schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  investment_package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: " investment_package",
    required: true,
  },
  investment_number: {
    type: Number,
    required: true,
  },
});

const Investment_history = mongoose.model(
  "Investment_history",
  Investment_history_schema,
);
module.exports = Investment_history;
