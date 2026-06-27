const calculator = document.getElementById("needsCalculator");
const resultBox = document.getElementById("calculatorResult");

function formatMoney(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

if (calculator) {
  calculator.addEventListener("submit", function (event) {
    event.preventDefault();

    const income = Number(document.getElementById("income").value) || 0;
    const mortgage = Number(document.getElementById("mortgage").value) || 0;
    const children = Number(document.getElementById("children").value) || 0;
    const existingCoverage = Number(document.getElementById("existingCoverage").value) || 0;
    const savings = Number(document.getElementById("savings").value) || 0;

    const incomeReplacement = income * 10;
    const finalExpenses = 25000;
    const childrenNeeds = children * 50000;

    let totalNeed =
      incomeReplacement +
      mortgage +
      finalExpenses +
      childrenNeeds -
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
        <p>Based on the information you provided.</p>
        <a href="#contact">Request My Personalized Quote</a>
      </div>

      <div class="breakdown-card">
        <h3>Needs Breakdown</h3>

        <div class="breakdown-row">
          <span>Income Replacement (10 years)</span>
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
          <strong>-${formatMoney(existingCoverage)}</strong>
        </div>

        <div class="breakdown-row">
          <span>Savings Available</span>
          <strong>-${formatMoney(savings)}</strong>
        </div>

        <div class="breakdown-row total">
          <span>Estimated Coverage Need</span>
          <strong>${formatMoney(totalNeed)}</strong>
        </div>

        <p class="calculator-note">
          This calculator is for educational purposes only and does not guarantee coverage, approval, or pricing.
          A personalized review can help determine what amount and type of coverage may fit your situation.
        </p>
      </div>
    `;
  });
}