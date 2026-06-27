const calculator = document.getElementById("needsCalculator");
const resultBox = document.getElementById("calculatorResult");

function formatMoney(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatNegativeMoney(amount) {
  return amount > 0 ? `-${formatMoney(amount)}` : "$0";
}

if (calculator) {
  calculator.addEventListener("submit", function (event) {
    event.preventDefault();

    const income =
  Number(
    document.getElementById("income").value.replace(/[^\d]/g, "")
  ) || 0;

const mortgage =
  Number(
    document.getElementById("mortgage").value.replace(/[^\d]/g, "")
  ) || 0;

const existingCoverage =
  Number(
    document.getElementById("existingCoverage").value.replace(/[^\d]/g, "")
  ) || 0;

const savings =
  Number(
    document.getElementById("savings").value.replace(/[^\d]/g, "")
  ) || 0;
    // Calculation

    const incomeReplacement = income * 10;
    const finalExpenses = 25000;
    const childrenNeeds = children * 50000;

    let totalNeed =
      incomeReplacement +
      mortgage +
      childrenNeeds +
      finalExpenses -
      existingCoverage -
      savings;

    if (totalNeed < 0) {
      totalNeed = 0;
    }

    resultBox.style.display = "block";

    resultBox.innerHTML = `
    
      <div class="result-summary">
      
        <h3>Your Estimated Life Insurance Need</h3>

        <p class="estimate">${formatMoney(totalNeed)}</p>

        <p>
          Based on the information you provided.
        </p>

        <a href="#contact" class="btn">
          Request My Personalized Quote
        </a>

      </div>

      <div class="breakdown-card">

        <h3>Needs Breakdown</h3>

        <div class="breakdown-row">
          <span>Income Replacement (10 Years)</span>
          <strong>${formatMoney(incomeReplacement)}</strong>
        </div>

        <div class="breakdown-row">
          <span>Mortgage / Debt</span>
          <strong>${formatMoney(mortgage)}</strong>
        </div>

        <div class="breakdown-row">
          <span>Children's Future Needs</span>
          <strong>${formatMoney(childrenNeeds)}</strong>
        </div>

        <div class="breakdown-row">
          <span>Final Expenses</span>
          <strong>${formatMoney(finalExpenses)}</strong>
        </div>

        <div class="breakdown-row">
          <span>Existing Life Insurance</span>
          <strong>${formatNegativeMoney(existingCoverage)}</strong>
        </div>

        <div class="breakdown-row">
          <span>Savings Available</span>
          <strong>${formatNegativeMoney(savings)}</strong>
        </div>

        <div class="breakdown-row total">
          <span>Estimated Coverage Need</span>
          <strong>${formatMoney(totalNeed)}</strong>
        </div>

        <p class="calculator-note">
          This calculator provides an educational estimate only and should not
          be considered financial, legal, or tax advice. Coverage amounts,
          eligibility, premiums, and policy availability vary based on your
          individual circumstances and the underwriting guidelines of each
          insurance company. A personalized consultation can help determine
          the amount and type of coverage that best fits your family's needs.
        </p>

      </div>
    `;

    // Scroll to results after calculation

    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
// ------------------------------
// Currency Input Formatting
// ------------------------------

const currencyFields = [
    "income",
    "mortgage",
    "existingCoverage",
    "savings"
  ];
  
  currencyFields.forEach((id) => {
  
    const input = document.getElementById(id);
  
    if (!input) return;
  
    // Format when user leaves the field
    input.addEventListener("blur", function () {
  
      let value = this.value.replace(/[^\d]/g, "");
  
      if (value === "") {
        this.value = "";
        return;
      }
  
      this.value = Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
      });
  
    });
  
    // Remove formatting while editing
    input.addEventListener("focus", function () {
  
      this.value = this.value.replace(/[^\d]/g, "");
  
    });
  
  });