const calculator = document.getElementById("needsCalculator");
const resultBox = document.getElementById("calculatorResult");
const menuToggle =
  document.getElementById("mobileMenuToggle") ||
  document.getElementById("menuToggle");
const mobileDrawer = document.getElementById("mobileDrawer");
const mobileOverlay = document.getElementById("mobileMenuOverlay");
const mobileDrawerClose = document.getElementById("mobileDrawerClose");

function formatMoney(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function getMoneyValue(id) {
  const input = document.getElementById(id);
  return Number(input.value.replace(/[^\d]/g, "")) || 0;
}

function formatNegativeMoney(amount) {
  return amount > 0 ? `-${formatMoney(amount)}` : "$0";
}

const currencyFields = ["income", "mortgage", "existingCoverage", "savings"];

currencyFields.forEach((id) => {
  const input = document.getElementById(id);
  if (!input) return;

  input.addEventListener("blur", function () {
    const value = this.value.replace(/[^\d]/g, "");

    if (value === "") {
      this.value = "";
      return;
    }

    this.value = formatMoney(Number(value));
  });

  input.addEventListener("focus", function () {
    this.value = this.value.replace(/[^\d]/g, "");
  });
});

if (calculator) {
  calculator.addEventListener("submit", function (event) {
    event.preventDefault();

    const income = getMoneyValue("income");
    const mortgage = getMoneyValue("mortgage");
    const existingCoverage = getMoneyValue("existingCoverage");
    const savings = getMoneyValue("savings");
    const children = Number(document.getElementById("children").value) || 0;

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

    if (totalNeed < 0) totalNeed = 0;

    resultBox.style.display = "block";

    resultBox.innerHTML = `
      <div class="result-summary">
        <h3>Your Estimated Life Insurance Need</h3>
        <p class="estimate">${formatMoney(totalNeed)}</p>
        <p>Based on the information you provided.</p>
        <a href="#contact" class="btn">Request My Personalized Quote</a>
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
          This calculator provides an educational estimate only and does not guarantee coverage, approval, or pricing.
          A personalized consultation can help determine what amount and type of coverage may fit your family's needs.
        </p>
      </div>
    `;

    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

/* ==========================================
   Mobile Drawer
========================================== */

function openDrawer() {
  mobileDrawer.classList.add("active");
  mobileOverlay.classList.add("active");
  document.body.classList.add("menu-open");

  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  mobileDrawer.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");

  document.body.style.overflow = "";
}

if (menuToggle) {
  menuToggle.addEventListener("click", openDrawer);
}

if (mobileDrawerClose) {
  mobileDrawerClose.addEventListener("click", closeDrawer);
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeDrawer);
}

document.querySelectorAll(".mobile-drawer-links a").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDrawer();
  }
});
