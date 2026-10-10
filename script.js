const RATES = {
  amazon: { ngn: 1425, kes: 128 },
  itunes: { ngn: 1380, kes: 124 },
  steam: { ngn: 1450, kes: 130 },
  google: { ngn: 1360, kes: 122 },
  sephora: { ngn: 1400, kes: 126 },
  visa: { ngn: 1320, kes: 118 },
  razer: { ngn: 1480, kes: 132 },
  xbox: { ngn: 1390, kes: 125 },
  walmart: { ngn: 1340, kes: 120 },
  nike: { ngn: 1370, kes: 123 },
};

const CARD_LABELS = {
  amazon: 'Amazon',
  itunes: 'Apple / iTunes',
  steam: 'Steam',
  google: 'Google Play',
  sephora: 'Sephora',
  visa: 'Visa',
  razer: 'Razer Gold',
  xbox: 'Xbox',
  walmart: 'Walmart',
  nike: 'Nike',
};

const CARDS = Object.keys(RATES);

function formatAmount(amount, currency) {
  if (currency === 'ngn') {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  }
  return 'KSh ' + Math.round(amount).toLocaleString('en-KE');
}

function formatRate(rate, currency) {
  if (currency === 'ngn') {
    return '₦' + rate.toLocaleString('en-NG') + ' / $';
  }
  return 'KSh ' + rate.toLocaleString('en-KE') + ' / $';
}

function updateCalculator() {
  const card = document.getElementById('cardSelect').value;
  const face = parseFloat(document.getElementById('faceValue').value) || 0;
  const currency = document.getElementById('currencySelect').value;

  const rate = RATES[card][currency];
  const payout = face * rate;

  document.getElementById('payoutAmount').textContent = formatAmount(payout, currency);
  document.getElementById('rateDisplay').textContent = formatRate(rate, currency);

  const better = currency === 'ngn' ? 11 + Math.floor(Math.random() * 5) : 9 + Math.floor(Math.random() * 4);
  document.getElementById('bestRateBadge').textContent = `~${better}% better than average market rate`;
}

function populateCardGrid() {
  const grid = document.getElementById('cardGrid');
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
  }).join('');
}

function handleSell(e) {
  e.preventDefault();
  const msg = document.getElementById('formMessage');
  msg.textContent = '✅ Demo submitted! In a real app this would start verification and payout to your ₦ or KSh account.';
  msg.classList.remove('hidden', 'text-red-400');
  msg.classList.add('show', 'text-emerald-400');
  e.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cardSelect').addEventListener('change', updateCalculator);
  document.getElementById('faceValue').addEventListener('input', updateCalculator);
  document.getElementById('currencySelect').addEventListener('change', updateCalculator);

  populateCardGrid();
  updateCalculator();
});
