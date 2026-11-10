/**
 * Microsys B2B Profit Margin Calculator
 * Pure Vanilla JavaScript implementation with zero external dependencies.
 * Handles interactive two-way calculation modes:
 *   Mode 1: Calculate Margin & Profit (User inputs Cost Price and Selling Price)
 *   Mode 2: Calculate Selling Price (User inputs Cost Price and Target Margin %)
 * Updates CSS Custom Properties (--cost-height, --profit-height) for dynamic bar chart.
 */

(function () {
  'use strict';

  // Formatters for Indian Currency and Percentages
  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  const pctFormatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  });

  // DOM Mode Toggle Buttons
  const modeSpBtn = document.getElementById('mode-sp-btn');
  const modeMarginBtn = document.getElementById('mode-margin-btn');

  // Input Field Containers (to toggle visibility)
  const spGroup = document.getElementById('sp-group');
  const marginGroup = document.getElementById('margin-group');

  // Input Elements
  const cpInput = document.getElementById('cp-input');
  const cpSlider = document.getElementById('cp-slider');

  const spInput = document.getElementById('sp-input');
  const spSlider = document.getElementById('sp-slider');

  const marginInput = document.getElementById('target-margin-input');
  const marginSlider = document.getElementById('target-margin-slider');

  const qtyInput = document.getElementById('qty-input');

  // Display Elements
  const primaryMetricLabel = document.getElementById('primary-metric-label');
  const unitProfitDisplay = document.getElementById('unit-profit-display');
  const marginDisplay = document.getElementById('margin-display');
  const markupDisplay = document.getElementById('markup-display');
  const profitNote = document.getElementById('profit-note');

  // Secondary Metric Box (Mode 2)
  const secondaryMetricBox = document.getElementById('secondary-metric-box');
  const secondaryMetricDisplay = document.getElementById('secondary-metric-display');

  // Bulk Display Elements
  const bulkSummaryStrip = document.getElementById('bulk-summary-strip');
  const totalRevenueDisplay = document.getElementById('total-revenue-display');
  const totalCostDisplay = document.getElementById('total-cost-display');
  const totalProfitDisplay = document.getElementById('total-profit-display');

  // Chart Elements
  const barCost = document.getElementById('bar-cost');
  const barProfit = document.getElementById('bar-profit');
  const barCostVal = document.getElementById('bar-cost-val');
  const barProfitVal = document.getElementById('bar-profit-val');
  const barCostAmount = document.getElementById('bar-cost-amount');
  const barProfitAmount = document.getElementById('bar-profit-amount');
  const legendCostPct = document.getElementById('legend-cost-pct');
  const legendProfitPct = document.getElementById('legend-profit-pct');
  const dealHealthTag = document.getElementById('deal-health-tag');

  // Loss Warning Elements
  const lossWarning = document.getElementById('loss-warning');
  const lossAmount = document.getElementById('loss-amount');

  // Active Mode: 'sp' (Mode 1: Calculate Margin) or 'margin' (Mode 2: Calculate Selling Price)
  let currentMode = 'sp';

  /**
   * Switch calculation mode and dynamically show/hide input groups
   */
  function setMode(mode) {
    currentMode = mode;

    if (mode === 'sp') {
      // Mode 1: Calculate Margin & Profit
      modeSpBtn.classList.add('active');
      modeSpBtn.setAttribute('aria-selected', 'true');
      modeMarginBtn.classList.remove('active');
      modeMarginBtn.setAttribute('aria-selected', 'false');

      // Show Selling Price group, Hide Target Margin group
      if (spGroup) spGroup.style.display = 'block';
      if (marginGroup) marginGroup.style.display = 'none';

      // Hide Mode 2 secondary metric box
      if (secondaryMetricBox) secondaryMetricBox.style.display = 'none';
      if (primaryMetricLabel) primaryMetricLabel.textContent = 'Gross Profit (Unit)';

    } else {
      // Mode 2: Calculate Selling Price
      modeMarginBtn.classList.add('active');
      modeMarginBtn.setAttribute('aria-selected', 'true');
      modeSpBtn.classList.remove('active');
      modeSpBtn.setAttribute('aria-selected', 'false');

      // Hide Selling Price group, Show Target Margin group
      if (spGroup) spGroup.style.display = 'none';
      if (marginGroup) marginGroup.style.display = 'block';

      // Show Mode 2 secondary metric box
      if (secondaryMetricBox) secondaryMetricBox.style.display = 'block';
      if (primaryMetricLabel) primaryMetricLabel.textContent = 'Required Selling Price (SP)';
    }

    // Recalculate immediately with fresh mode parameters
    calculate();
  }

  /**
   * Main calculation and UI update routine
   */
  function calculate() {
    let cp = parseFloat(cpInput.value);
    if (isNaN(cp) || cp < 0) cp = 0;

    let qty = parseInt(qtyInput.value, 10);
    if (isNaN(qty) || qty < 1) qty = 1;

    let sp = 0;
    let marginPct = 0;
    let markupPct = 0;
    let grossProfit = 0;

    if (currentMode === 'sp') {
      // Mode 1: Find Margin & Profit (Inputs: CP & SP)
      sp = parseFloat(spInput.value);
      if (isNaN(sp) || sp < 0) sp = 0;

      grossProfit = sp - cp;
      marginPct = sp > 0 ? (grossProfit / sp) * 100 : 0;
      markupPct = cp > 0 ? (grossProfit / cp) * 100 : 0;

      // Update Primary Highlight Card (Gross Profit)
      if (grossProfit >= 0) {
        unitProfitDisplay.textContent = inrFormatter.format(grossProfit);
        unitProfitDisplay.style.color = 'var(--color-green-success, #15803D)';
        if (profitNote) profitNote.textContent = 'Selling Price minus Cost Price';
        if (lossWarning) lossWarning.style.display = 'none';
      } else {
        const lossVal = Math.abs(grossProfit);
        unitProfitDisplay.textContent = '-' + inrFormatter.format(lossVal);
        unitProfitDisplay.style.color = 'var(--color-red-error, #DC2626)';
        if (profitNote) profitNote.textContent = 'Quoted below acquisition cost';
        if (lossWarning) {
          lossWarning.style.display = 'flex';
          lossAmount.textContent = inrFormatter.format(lossVal);
        }
      }

    } else {
      // Mode 2: Find Selling Price (Inputs: CP & Target Margin %)
      marginPct = parseFloat(marginInput.value);
      if (isNaN(marginPct) || marginPct < 0) marginPct = 0;
      if (marginPct >= 99) marginPct = 99; // Cap to avoid division by zero or negative infinite SP

      // Math: SP = CP / (1 - (Margin / 100))
      const marginDecimal = marginPct / 100;
      sp = marginDecimal < 1 ? cp / (1 - marginDecimal) : cp;
      grossProfit = sp - cp;
      markupPct = cp > 0 ? (grossProfit / cp) * 100 : 0;

      // Update Primary Highlight Card (Required Selling Price)
      unitProfitDisplay.textContent = inrFormatter.format(Math.round(sp));
      unitProfitDisplay.style.color = 'var(--color-blue-primary, #245BDB)';
      if (profitNote) {
        profitNote.textContent = 'Quote this unit price to achieve ' + pctFormatter.format(marginPct) + '% margin';
      }
      if (lossWarning) lossWarning.style.display = 'none';

      // Update Secondary Metric Box (Gross Profit at Target Margin)
      if (secondaryMetricDisplay) {
        secondaryMetricDisplay.textContent = inrFormatter.format(Math.round(grossProfit));
      }
    }

    // Update Percentage Output Boxes
    if (marginDisplay) marginDisplay.textContent = pctFormatter.format(marginPct) + '%';
    if (markupDisplay) markupDisplay.textContent = pctFormatter.format(markupPct) + '%';

    // Bulk Order Quantity Calculation
    if (qty > 1) {
      if (bulkSummaryStrip) bulkSummaryStrip.style.display = 'flex';
      const totalRev = sp * qty;
      const totalCost = cp * qty;
      const totalProfit = grossProfit * qty;

      if (totalRevenueDisplay) totalRevenueDisplay.textContent = inrFormatter.format(Math.round(totalRev));
      if (totalCostDisplay) totalCostDisplay.textContent = inrFormatter.format(Math.round(totalCost));
      if (totalProfitDisplay) {
        totalProfitDisplay.textContent = inrFormatter.format(Math.round(totalProfit));
        totalProfitDisplay.style.color = totalProfit >= 0 ? 'var(--color-green-success, #15803D)' : 'var(--color-red-error, #DC2626)';
      }
    } else {
      if (bulkSummaryStrip) bulkSummaryStrip.style.display = 'none';
    }

    // Health Badge Tagging
    if (dealHealthTag) {
      if (grossProfit < 0) {
        dealHealthTag.textContent = 'Selling at Loss';
        dealHealthTag.style.background = 'rgba(220, 38, 38, 0.1)';
        dealHealthTag.style.color = 'var(--color-red-error, #DC2626)';
        dealHealthTag.style.borderColor = 'rgba(220, 38, 38, 0.25)';
      } else if (marginPct >= 20) {
        dealHealthTag.textContent = 'High Margin';
        dealHealthTag.style.background = 'rgba(21, 128, 61, 0.1)';
        dealHealthTag.style.color = 'var(--color-green-success, #15803D)';
        dealHealthTag.style.borderColor = 'rgba(21, 128, 61, 0.25)';
      } else if (marginPct >= 10) {
        dealHealthTag.textContent = 'Healthy Margin';
        dealHealthTag.style.background = 'var(--color-blue-light, #EAF1FF)';
        dealHealthTag.style.color = 'var(--color-blue-primary, #245BDB)';
        dealHealthTag.style.borderColor = 'var(--color-blue-secondary-border, #C7D7FF)';
      } else {
        dealHealthTag.textContent = 'Competitive Margin';
        dealHealthTag.style.background = 'rgba(180, 83, 9, 0.1)';
        dealHealthTag.style.color = 'var(--color-amber-warning, #B45309)';
        dealHealthTag.style.borderColor = 'rgba(180, 83, 9, 0.25)';
      }
    }

    // Dynamic Bar Chart Heights (Using CSS Custom Properties)
    let costBarHeight = 16;
    let profitBarHeight = 16;

    if (sp > 0 && grossProfit >= 0) {
      const costPctOfSP = (cp / sp) * 100;
      const profitPctOfSP = (grossProfit / sp) * 100;

      // Scale proportionally within 16% to 92%
      costBarHeight = Math.max(16, Math.min(92, Math.round(costPctOfSP * 0.92)));
      profitBarHeight = Math.max(16, Math.min(92, Math.round(profitPctOfSP * 0.92)));

      if (barCostVal) barCostVal.textContent = Math.round(costPctOfSP) + '%';
      if (barProfitVal) barProfitVal.textContent = Math.round(profitPctOfSP) + '%';
      if (legendCostPct) legendCostPct.textContent = Math.round(costPctOfSP) + '%';
      if (legendProfitPct) legendProfitPct.textContent = Math.round(profitPctOfSP) + '%';

      if (barProfit) {
        barProfit.style.background = 'var(--color-green-success, #15803D)';
      }
    } else if (grossProfit < 0) {
      // Loss scenario: Cost exceeds Selling Price
      costBarHeight = 92;
      profitBarHeight = 16;
      if (barCostVal) barCostVal.textContent = '100%';
      if (barProfitVal) barProfitVal.textContent = 'Loss';
      if (legendCostPct) legendCostPct.textContent = '100%';
      if (legendProfitPct) legendProfitPct.textContent = 'Loss';
      if (barProfit) {
        barProfit.style.background = 'var(--color-red-error, #DC2626)';
      }
    } else {
      costBarHeight = 50;
      profitBarHeight = 16;
      if (barCostVal) barCostVal.textContent = '0%';
      if (barProfitVal) barProfitVal.textContent = '0%';
      if (legendCostPct) legendCostPct.textContent = '0%';
      if (legendProfitPct) legendProfitPct.textContent = '0%';
    }

    if (barCost) barCost.style.setProperty('--cost-height', costBarHeight + '%');
    if (barProfit) barProfit.style.setProperty('--profit-height', profitBarHeight + '%');

    if (barCostAmount) barCostAmount.textContent = inrFormatter.format(cp);
    if (barProfitAmount) barProfitAmount.textContent = inrFormatter.format(Math.round(grossProfit));
  }

  // Event Listeners for Mode Toggle
  if (modeSpBtn && modeMarginBtn) {
    modeSpBtn.addEventListener('click', function () {
      setMode('sp');
    });

    modeMarginBtn.addEventListener('click', function () {
      setMode('margin');
    });
  }

  // Cost Price sync (Both modes)
  if (cpInput && cpSlider) {
    cpInput.addEventListener('input', function () {
      cpSlider.value = cpInput.value;
      calculate();
    });
    cpSlider.addEventListener('input', function () {
      cpInput.value = cpSlider.value;
      calculate();
    });
  }

  // Selling Price sync (Mode 1)
  if (spInput && spSlider) {
    spInput.addEventListener('input', function () {
      spSlider.value = spInput.value;
      calculate();
    });
    spSlider.addEventListener('input', function () {
      spInput.value = spSlider.value;
      calculate();
    });
  }

  // Target Margin sync (Mode 2)
  if (marginInput && marginSlider) {
    marginInput.addEventListener('input', function () {
      marginSlider.value = marginInput.value;
      calculate();
    });
    marginSlider.addEventListener('input', function () {
      marginInput.value = marginSlider.value;
      calculate();
    });
  }

  // Quantity input
  if (qtyInput) {
    qtyInput.addEventListener('input', function () {
      calculate();
    });
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function () {
    calculate();
  });

  // Immediate initial calculation call
  calculate();
})();
