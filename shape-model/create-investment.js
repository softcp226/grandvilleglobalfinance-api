const Investment = require("../model/investment");
const Investment_package = require("../model/investment-package");

const select_investment_end_time = async (req) => {
  try {
    const package = await Investment_package.findOne({
      package_name: req.body.investment_plan,
    })

    if (!package)
      throw new Error(
        "there was an error with the investment plan you selected",
      );
    //  {
    //   return res.status(400).json({
    //     error: true,
    //     errMessage: "",
    //   });

    switch (package.payment_period) {
      case "24 Hours":
        let date = new Date();
        date.setDate(date.getDate() + 1);
        let end_date = date.getTime();
        // let completion_time = "24 hours";
        // console.log("expires after 24 hours");
        return end_date;
        break;

      case "48 Hours":
        let date2 = new Date();
        date2.setDate(date2.getDate() + 2);
        let end_date2 = date2.getTime();
        console.log("expires after 48 hours");

        return end_date2;
        break;

      case "3 days":
        let date3 = new Date();
        date3.setDate(date3.getDate() + 3);
        let end_date3 = date3.getTime();
        console.log("expires after 3 days");
        return end_date3;
        break;

      case "5 days":
        let date4 = new Date();
        date4.setDate(date4.getDate() + 5);
        let end_date4 = date4.getTime();
        console.log("expires after 5 days");
        return end_date4;
        break;

      case "7 Days":
        let date5 = new Date();
        date5.setDate(date5.getDate() + 7);
        let end_date5 = date5.getTime();
        console.log("expires after 7 days");
        return end_date5;
        break;

      case "1 month":
        let date6 = new Date();
        date6.setDate(date6.getDate() + 30);
        let end_date6 = date6.getTime();
        console.log("expires after 1 month");
        return end_date6;
        break;

      case "2 months":
        let date7 = new Date();
        date7.setDate(date7.getDate() + 60);
        let end_date7 = date7.getTime();
        console.log("expires after 2 months");
        return end_date7;
        break;

      case "3 months":
        let date8 = new Date();
        date8.setDate(date8.getDate() + 90);
        let end_date8 = date8.getTime();
        console.log("expires after 3 months");
        return end_date8;
        break;

      case "6 months":
        let date9 = new Date();
        date9.setDate(date9.getDate() + 182);
        let end_date9 = date9.getTime();
        console.log("expires after 6 months");
        return end_date9;
        break;

      case "1 year":
        let datex = new Date();
        datex.setDate(datex.getDate() + 365);
        let end_datex = datex.getTime();
        console.log("expires after 1 year");
        return end_datex;
        break;

      default:
        let def_date = new Date();
        def_date.setDate(def_date.getDate() + parseInt(package.specified_days));
        let def_end_date = def_date.getTime();
        console.log("expires at default", package.specified_days);

        return def_end_date;
        break;
    }
  } catch (error) {
    console.log("error",error)
    return { error: true, errMessage: error.message };
  }

  // if (req.body.return_time == "daily_return") {
  // let currentdate = new Date();
  // currentdate.setDate(currentdate.getDate() + 1);
  // let datetime = `${currentdate.getFullYear()}-${
  //   currentdate.getMonth() + 1
  // }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  // return datetime;

  // } else {
  // let currentdate = new Date();
  // currentdate.setDate(currentdate.getDate() + 7);
  // let datetime = `${currentdate.getFullYear()}-${
  //   currentdate.getMonth() + 1
  // }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  // return datetime;

  //   let date = new Date();
  //   date.setDate(date.getDate() + 7);
  //   let end_date = date.getTime();
  //   return end_date;
  // }
};

const create_investment = async (req, res) => {
  // console.log(res)
  try {
    const return_t = select_investment_end_time(req);
    if (return_t.error)
      throw new Error({ error: true, errMessage: return_t.errMessage });

    let currentdate = new Date();
    let datetime = `${currentdate.getFullYear()}-${
      currentdate.getMonth() + 1
    }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
    let ref = Math.floor(Math.random() * 1000);
    console.log("end time", await select_investment_end_time(req));

    const investment = await new Investment({
      user: req.body.user,
      transaction_date: datetime,
      refrence_number: `Ref#${++ref} `,
      amount: req.body.investment_amount,
      completion_time:req.body.completion_time,
      // return_time: req.body.return_time,
      pending_profit: req.body.profit,
      investment_plan: req.body.investment_plan,
      investment_end_date: await select_investment_end_time(req),
    });
    await investment.save();
    return investment;
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};
module.exports = create_investment;
