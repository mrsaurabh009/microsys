/**
 * Microsys EMI Calculator Logic
 * Real-time Vanilla JavaScript loan calculations & CSS conic-gradient chart updates
 * Zero external libraries
 */

(function () {
  'use strict';

  // DOM Elements - Inputs & Sliders
  const loanAmountInput = document.getElementById('loan-amount-input');
  const loanAmountSlider = document.getElementById('loan-amount-slider');
  const interestRateInput = document.getElementById('interest-rate-input');
  const interestRateSlider = document.getElementById('interest-rate-slider');
  const loanTenureInput = document.getElementById('loan-tenure-input');
  const loanTenureSlider = document.getElementById('loan-tenure-slider');

  // Tenure Toggle
  const tenureUnitYearsBtn = document.getElementById('tenure-unit-years');
  const tenureUnitMonthsBtn = document.getElementById('tenure-unit-months');
  const tenureRangeLabels = document.getElementById('tenure-range-labels');

  // DOM Elements - Outputs
  const monthlyEmiDisplay = document.getElementById('monthly-emi-display');
  const principalAmountDisplay = document.getElementById('principal-amount-display');
  const totalInterestDisplay = document.getElementById('total-interest-display');
  const totalAmountDisplay = document.getElementById('total-amount-display');
  const principalPctDisplay = document.getElementById('principal-pct-display');
  const interestPctDisplay = document.getElementById('interest-pct-display');
  const chartCenterVal = document.getElementById('chart-center-val');
  const pieChart = document.getElementById('emi-pie-chart');

  // Current Tenure Mode: 'years' or 'months'
  let tenureMode = 'years';

  // Formatter for Indian Rupee currency (₹)
  const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  /**
   * Calculate EMI and update UI
   */
  function calculateEMI() {
    if (!loanAmountInput || !interestRateInput || !loanTenureInput) return;

    let principal = parseFloat(loanAmountInput.value) || 0;
    let annualRate = parseFloat(interestRateInput.value) || 0;
    let tenureVal = parseFloat(loanTenureInput.value) || 1;

    // Safety clamps
    if (principal < 1000) principal = 1000;
    if (annualRate < 0) annualRate = 0;

    // Calculate total months
    let totalMonths = tenureMode === 'years' ? Math.round(tenureVal * 12) : Math.round(tenureVal);
    if (totalMonths < 1) totalMonths = 1;

    // Monthly interest rate
    let monthlyRate = (annualRate / 12) / 100;

    let emi = 0;
    let totalAmount = 0;
    let totalInterest = 0;

    if (monthlyRate === 0) {
      // 0% interest edge case (Zero Cost EMI)
      emi = principal / totalMonths;
      totalAmount = principal;
      totalInterest = 0;
    } else {
      // Standard reducing balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
      let factor = Math.pow(1 + monthlyRate, totalMonths);
      emi = (principal * monthlyRate * factor) / (factor - 1);
      totalAmount = emi * totalMonths;
      totalInterest = totalAmount - principal;
    }

    // Guard against NaN or Infinity
    if (isNaN(emi) || !isFinite(emi) || emi < 0) emi = 0;
    if (isNaN(totalAmount) || !isFinite(totalAmount) || totalAmount < 0) totalAmount = 0;
    if (isNaN(totalInterest) || !isFinite(totalInterest) || totalInterest < 0) totalInterest = 0;

    // Update Output Displays
    if (monthlyEmiDisplay) monthlyEmiDisplay.textContent = currencyFormatter.format(Math.round(emi));
    if (principalAmountDisplay) principalAmountDisplay.textContent = currencyFormatter.format(Math.round(principal));
    if (totalInterestDisplay) totalInterestDisplay.textContent = currencyFormatter.format(Math.round(totalInterest));
    if (totalAmountDisplay) totalAmountDisplay.textContent = currencyFormatter.format(Math.round(totalAmount));
    if (chartCenterVal) chartCenterVal.textContent = currencyFormatter.format(Math.round(totalAmount));

    // Calculate Percentages for Pie Chart
    let principalPct = totalAmount > 0 ? (principal / totalAmount) * 100 : 100;
    let interestPct = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0;

    principalPct = Math.min(100, Math.max(0, principalPct));
    interestPct = Math.min(100, Math.max(0, interestPct));

    if (principalPctDisplay) principalPctDisplay.textContent = `(${principalPct.toFixed(1)}%)`;
    if (interestPctDisplay) interestPctDisplay.textContent = `(${interestPct.toFixed(1)}%)`;

    // Dynamically update CSS conic-gradient variable
    if (pieChart) {
      pieChart.style.setProperty('--pie-percentage', `${principalPct.toFixed(1)}%`);
    }
  }

  /**
   * Bind dual-control listeners (Slider <-> Number Input)
   */
  function bindDualControls(slider, input, min, max, step) {
    if (!slider || !input) return;

    slider.addEventListener('input', function () {
      input.value = slider.value;
      calculateEMI();
    });

    input.addEventListener('input', function () {
      let val = parseFloat(input.value);
      if (!isNaN(val)) {
        if (val >= min && val <= max) {
          slider.value = val;
        }
      }
      calculateEMI();
    });

    input.addEventListener('blur', function () {
      let val = parseFloat(input.value);
      if (isNaN(val) || val < min) {
        input.value = min;
        slider.value = min;
      } else if (val > max) {
        input.value = max;
        slider.value = max;
      }
      calculateEMI();
    });
  }

  /**
   * Tenure unit switcher (Years vs Months)
   */
  function setTenureMode(mode) {
    if (mode === tenureMode) return;
    tenureMode = mode;

    if (mode === 'years') {
      tenureUnitYearsBtn.classList.add('active');
      tenureUnitMonthsBtn.classList.remove('active');

      let currentMonths = parseFloat(loanTenureInput.value) || 12;
      let yearsVal = Math.max(1, Math.min(5, Math.round(currentMonths / 12) || 1));

      loanTenureInput.min = '1';
      loanTenureInput.max = '5';
      loanTenureInput.step = '1';
      loanTenureInput.value = yearsVal;

      loanTenureSlider.min = '1';
      loanTenureSlider.max = '5';
      loanTenureSlider.step = '1';
      loanTenureSlider.value = yearsVal;

      if (tenureRangeLabels) {
        tenureRangeLabels.innerHTML = '<span>1 Year</span><span>5 Years</span>';
      }
    } else {
      tenureUnitMonthsBtn.classList.add('active');
      tenureUnitYearsBtn.classList.remove('active');

      let currentYears = parseFloat(loanTenureInput.value) || 1;
      let monthsVal = Math.max(3, Math.min(60, Math.round(currentYears * 12)));

      loanTenureInput.min = '3';
      loanTenureInput.max = '60';
      loanTenureInput.step = '1';
      loanTenureInput.value = monthsVal;

      loanTenureSlider.min = '3';
      loanTenureSlider.max = '60';
      loanTenureSlider.step = '1';
      loanTenureSlider.value = monthsVal;

      if (tenureRangeLabels) {
        tenureRangeLabels.innerHTML = '<span>3 Months</span><span>60 Months</span>';
      }
    }

    calculateEMI();
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    bindDualControls(loanAmountSlider, loanAmountInput, 10000, 500000, 1000);
    bindDualControls(interestRateSlider, interestRateInput, 5, 30, 0.1);
    bindDualControls(loanTenureSlider, loanTenureInput, 1, 5, 1);

    if (tenureUnitYearsBtn && tenureUnitMonthsBtn) {
      tenureUnitYearsBtn.addEventListener('click', function () {
        setTenureMode('years');
      });
      tenureUnitMonthsBtn.addEventListener('click', function () {
        setTenureMode('months');
      });
    }

    // Run initial calculation
    calculateEMI();
  });

  // Fallback if script loads after DOMContentLoaded
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    calculateEMI();
  }
})();

