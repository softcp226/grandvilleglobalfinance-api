const express = require("express");
const Router = express.Router();
const Loan = require("../model/loan");
const Admin = require("../model/admin");
const Transaction = require("../model/transaction");
const User = require("../model/user");

const validate_admin_disaprove_loan = require("../validation/validate_admin_disaprove_loan");
const verifyToken = require("../secure-admin-api/verifyToken");
const {
  create_mail_options,
  transporter,
} = require("../mailer/disaprove_loan");
const {
  create_mail_options2,
  transporter2,
} = require("../mailer/approve_loan");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_disaprove_loan(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const loan_request = await Loan.findById(req.body.loan_request);
    if (!loan_request)
      return res.status(400).json({
        error: true,
        errMessage:
          "The loan you requested to approve does not exist , please refresh and try again",
      });
    loan_request.set({ status: "success", refrence: "Verified" });
    console.log(loan_request);
    const user = await User.findById(loan_request.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "an unexpected error occured!, the user that requested for this loan was not found.",
      });
    user.set({
      final_balance: user.final_balance + parseInt(loan_request.loan_amount),
    });

    let currentdate = new Date();
    let datetime = `${currentdate.getFullYear()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

    const transaction = await new Transaction({
      user: user._id,
      refrence_number: `Loan Granted`,
      transaction_date: datetime,
      credit: `$${loan_request.loan_amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      status: "success",
    });
    await loan_request.save();
    await user.save();
    await transaction.save();

    transporter.sendMail(
      create_mail_options({
        full_name: user.full_name,
        reciever: user.email,
        loan_amount: `$${loan_request.loan_amount}`,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      },
    );
    res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/disaprove", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_disaprove_loan(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const loan_request = await Loan.findById(req.body.loan_request).populate(
      "user",
    );
    if (!loan_request)
      return res.status(400).json({
        error: true,
        errMessage:
          "The loan you requested to disaprove does not exist , please refresh and try again",
      });
    loan_request.set({ status: "failed" });
    await loan_request.save();

    transporter.sendMail(
      create_mail_options({
        full_name: user.full_name,
        reciever: user.email,
        loan_amount: `$${loan_request.loan_amount}`,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      },
    );
    res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
