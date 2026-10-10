// Rates set at ~50% of face value
// (based on approx 1600 NGN/USD and 130 KES/USD)
// You can adjust any number below anytime.
const RATES = {
  amazon:   { ngn: 800,  kes: 65  },
  itunes:   { ngn: 800,  kes: 65  },
  steam:    { ngn: 800,  kes: 65  },
  google:   { ngn: 800,  kes: 65  },
  sephora:  { ngn: 800,  kes: 65  },
  visa:     { ngn: 800,  kes: 65  },
  razer:    { ngn: 800,  kes: 65  },
  xbox:     { ngn: 800,  kes: 65  },
  walmart:  { ngn: 800,  kes: 65  },
  nike:     { ngn: 800,  kes: 65  },
};

const CARD_LABELS = {
  amazon: "Amazon",
  itunes: "Apple / iTunes",
  steam: "Steam",
  google: "Google Play",
  sephora: "Sephora",
  visa: "Visa",
  razer: "Razer Gold",
  xbox: "Xbox",
  walmart: "Walmart",
  nike: "Nike",
};

const CARDS = Object.keys(RATES);

function formatAmount(amount, currency) {
  if (currency === "ngn") {
    return "₦" + Math.round(amount).toLocaleString("en-NG");
  }
  return "KSh " + Math.round(amount).toLocaleString("en-KE");
}

function formatRate(rate, currency) {
  if (currency === "ngn") {
    return "₦" + rate.toLocaleString("en-NG") + " / $";
  }
  return "KSh " + rate.toLocaleString("en-KE") + " / $";
}

function updateCalculator() {
  const card = document.getElementById("cardSelect").value;
  const face = parseFloat(document.getElementById("faceValue").value) || 0;
  const currency = document.getElementById("currencySelect").value;

  const rate = RATES[card][currency];
  const payout = face * rate;

  document.getElementById("payoutAmount").textContent = formatAmount(payout, currency);
  document.getElementById("rateDisplay").textContent = formatRate(rate, currency);

  document.getElementById("bestRateBadge").textContent =
    "Rate set at ~50% of face value • Fast payout after verification";
}

function populateCardGrid() {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = CARDS.map((key) => {
    const label = CARD_LABELS[key];
    const rateNgn = RATES[key].ngn;
    return `
      <div class="bg-dark-800 border border-dark-600 rounded-xl p-4 text-center cursor-default">
        <div class="text-sm font-semibold mb-1">${label}</div>
        <div class="text-xs text-brand-400">₦${rateNgn.toLocaleString()} / $</div>
        <div class="text-xs text-slate-500 mt-0.5">KSh ${RATES[key].kes} / $</div>
      </div>
    `;
  }).join("");
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cardSelect").addEventListener("change", updateCalculator);
  document.getElementById("faceValue").addEventListener("input", updateCalculator);
  document.getElementById("currencySelect").addEventListener("change", updateCalculator);

  populateCardGrid();
  updateCalculator();
});
