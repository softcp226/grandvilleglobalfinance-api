const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
const user = require("./user");
connectDB("connected to loan database");

const loanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  refrence: String,
  // account_number: {
  //   type: String,
  //   required: true,
  // },

  loan_amount: {
    type: String,
    required: true,
  },
  loan_type: {
    type: String,
    required: true,
  },
  loan_duration: {
    type: String,
    required: true,
  },
  loan_details: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },

  total_return: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Loan = mongoose.model("loan", loanSchema);
module.exports = Loan;
