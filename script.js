const calculator = document.getElementById("needsCalculator");
const resultBox = document.getElementById("calculatorResult");

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  
  window.addEventListener("load", () => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  });

if (calculator) {
  calculator.addEventListener("submit", function (event) {
    event.preventDefault();

    const married = Number(document.getElementById("married").value);
    const children = Number(document.getElementById("children").value);
    const mortgage = Number(document.getElementById("mortgage").value) || 0;
    const income = Number(document.getElementById("income").value) || 0;
    const existingCoverage = Number(document.getElementById("existingCoverage").value) || 0;

    let recommendedCoverage = income * 10 + mortgage;

    if (married === 1) {
      recommendedCoverage += income * 2;
    }

    if (children === 1) {
      recommendedCoverage += 100000;
    }

    recommendedCoverage -= existingCoverage;

    if (recommendedCoverage < 0) {
      recommendedCoverage = 0;
    }

    const formattedCoverage = recommendedCoverage.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    });

    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <h3>Your Estimated Coverage Need</h3>
      <p class="estimate">${formattedCoverage}</p>
      <p>
        This is a simple educational estimate based on income, mortgage balance,
        family needs, and current coverage. A personalized review can help determine
        what amount and product type may fit your situation.
      </p>
      <a href="#contact">Request a Personalized Quote</a>
    `;
  });
}