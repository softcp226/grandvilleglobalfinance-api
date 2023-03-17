const one_month = "One Month"; //2%
const three_months = "Three Months"; // 5%
const six_months = "Six Months"; //8%
const one_year = "One Year"; //10%
const one_year_and_six_months = "A Year and six Months"; //12.5%
const two_years = "Two Years"; //15%
const two_years_and_six_months = "Two Years and Six Months"; //17%
const three_years = "Three Years"; //20%
const create_interest_rate = (loan_amount, duration) => {
  switch (duration) {
    case one_month:
      interest = "4%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 4 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case three_months:
      interest = "5%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 5 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case six_months:
      interest = "8%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 8 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case one_year:
      interest = "10%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 10 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case one_year_and_six_months:
      interest = "12.5%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 12.5 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case two_years:
      interest = "15%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 15 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case two_years_and_six_months:
      interest = "17%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 17 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    case three_years:
      interest = "20%";
      total_return = `$${
        (parseInt(loan_amount) / 100) * 20 + parseInt(loan_amount)
      }`;
      return { interest, total_return };
      break;

    default:
      interest = "No Interest%";
      total_return = `$${loan_amount}`;
      break;
  }
};

console.log(create_interest_rate(20000, "One Year").interest);
module.exports = create_interest_rate;
