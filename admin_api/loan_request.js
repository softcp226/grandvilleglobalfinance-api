const express = require("express");
const Router = express.Router();
const Loan = require("../model/loan");
const validate_admin_fetch_loan = require("../validation/validate_admin_fetch_loan");
const Admin = require("../model/admin");
const validate_admin_fetch_single_loan = require("../validation/validate_admin_disaprove_loan");
const verifyToken = require("../secure-admin-api/verifyToken");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetch_loan(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const loan = await Loan.find({ status: "pending" }).populate("user");
    if (loan.length < 1)
      return res
        .status(400)
        .json({ error: true, errMessage: "No loan request has been made." });
    res.status(200).json({ error: false, message: loan });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/One", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetch_single_loan(req.body);
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
        errMessage: "The loan you requested was not found",
      });
    res.status(200).json({ error: false, message: loan_request });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
