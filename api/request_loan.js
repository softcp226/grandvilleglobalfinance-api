const express = require("express");
const Router = express.Router();
const Loan = require("../model/loan");
const validate_loan_application = require("../validation/validate_loan_request.js");
const validate_fetch_loan_request = require("../validation/validate_fetch_loan_request.js");
const verifyToken = require("../token/verifyToken");
const User = require("../model/user");

const create_interest_rate = require("../api_func/create_interest_rate.js");

Router.post("/", verifyToken, async (req, res) => {
  const isvalid = validate_loan_application(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user = await User.findById(req.body.user);
    if (!user)
      res.status(400).json({
        error: true,
        errMessage: "Please login again to apply for a loan",
      });

    if (parseInt(user.total_deposit) < 1000)
      return res.status(400).json({
        error: true,
        errMessage:
          "To request for a loan you must have atleast deposited up to $1,000 on your investment account",
      });
    const loan = await new Loan({
      user: req.body.user,
      // refrence_no: `Refrence No#${++refrence_no}`,
      account_number: req.body.account_number,
      loan_amount: req.body.loan_amount,
      loan_type: req.body.loan_type,
      loan_duration: req.body.loan_duration,
      loan_details: req.body.loan_details,
      interest: create_interest_rate(
        req.body.loan_amount,
        req.body.loan_duration,
      ).interest,
      total_return: create_interest_rate(
        req.body.loan_amount,
        req.body.loan_duration,
      ).total_return,
      status: "pending",
    });
    const result = await loan.save();
    res.status(200).json({ error: false, message: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/fetch", verifyToken, async (req, res) => {
  const isvalid = validate_fetch_loan_request(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const loan_request = await Loan.find({ user: req.body.user });
    if (loan_request.length < 1)
      return res.status(404).json({
        error: true,
        errMessage: "You have not made any loan request at the moment",
      });
    res.status(200).json({ error: false, message: loan_request });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
