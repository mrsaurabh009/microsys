/**
 * Microsys CGPA & Percentage Calculator
 * Dual-Scale (10-Point & 7-Point) and Dual-Direction (CGPA <-> %) Engine
 * Vanilla JavaScript — Zero External Dependencies
 */

(function () {
  'use strict';

  // DOM Elements
  const convCgpaToPctBtn = document.getElementById('conv-cgpa-to-pct');
  const convPctToCgpaBtn = document.getElementById('conv-pct-to-cgpa');
  const scale10Btn = document.getElementById('scale-10-btn');
  const scale7Btn = document.getElementById('scale-7-btn');

  const scoreInputLabel = document.getElementById('score-input-label');
  const cgpaValueInput = document.getElementById('cgpa-value-input');
  const cgpaSlider = document.getElementById('cgpa-slider');
  const scoreUnit = document.getElementById('score-unit');
  const sliderMinVal = document.getElementById('slider-min-val');
  const sliderMaxVal = document.getElementById('slider-max-val');
  const formulaNote = document.getElementById('formula-note');

  const primaryResultLabel = document.getElementById('primary-result-label');
  const primaryResultVal = document.getElementById('primary-result-val');
  const primaryResultSub = document.getElementById('primary-result-sub');
  const gpaVal = document.getElementById('gpa-val');
  const divisionVal = document.getElementById('division-val');
  const meterFill = document.getElementById('meter-fill');
  const eligibilityTag = document.getElementById('eligibility-tag');
  const abroadStatusText = document.getElementById('abroad-status-text');

  // Application State
  let currentDirection = 'cgpa-to-pct'; // 'cgpa-to-pct' | 'pct-to-cgpa'
  let currentScale = 10;                // 10 | 7

  /**
   * Helper: Format number with decimal places
   */
  function formatDecimal(val, decimals = 2) {
    return Number(val).toFixed(decimals);
  }

  /**
   * Determine Tier, Division, US GPA, and Study Abroad Feedback based on Percentage
   */
  function getAcademicTier(percentage) {
    if (percentage >= 85) {
      return {
        division: 'Distinction / Outstanding',
        gpa: '4.0 / 4.0',
        badge: 'Top Tier / Ivy League',
        abroad: 'Eligible for top 50 global universities and high-value scholarship programs (USA, UK, Germany, Singapore).'
      };
    } else if (percentage >= 75) {
      return {
        division: 'First Class with Distinction',
        gpa: '3.7 – 3.9 / 4.0',
        badge: 'Competitive Tier',
        abroad: 'Strong profile for reputed master\'s programs across the USA, UK, Canada, and Australia.'
      };
    } else if (percentage >= 65) {
      return {
        division: 'First Class',
        gpa: '3.3 – 3.6 / 4.0',
        badge: 'Direct Admission Eligible',
        abroad: 'Direct admission eligibility for most graduate programs in Germany, Ireland, and Australia.'
      };
    } else if (percentage >= 55) {
      return {
        division: 'Higher Second Class',
        gpa: '3.0 – 3.2 / 4.0',
        badge: 'Standard Eligibility',
        abroad: 'Meets standard entry requirements for international university master\'s courses.'
      };
    } else if (percentage >= 45) {
      return {
        division: 'Second Class',
        gpa: '2.5 – 2.9 / 4.0',
        badge: 'Pathway / Foundation',
        abroad: 'Pathway programs or pre-master\'s courses may be recommended by overseas universities.'
      };
    } else {
      return {
        division: 'Pass Class',
        gpa: '< 2.5 / 4.0',
        badge: 'Conditional Admission',
        abroad: 'Pre-sessional diplomas or bridge qualifications required for international applications.'
      };
    }
  }

  /**
   * Calculate and Update UI
   */
  function calculate() {
    const rawVal = parseFloat(cgpaValueInput.value);
    const inputVal = isNaN(rawVal) ? 0 : rawVal;

    let calculatedPercentage = 0;
    let calculatedCgpa = 0;

    if (currentDirection === 'cgpa-to-pct') {
      // Input is CGPA
      const maxCgpa = currentScale;
      const clampedCgpa = Math.max(0, Math.min(inputVal, maxCgpa));

      if (currentScale === 10) {
        calculatedPercentage = clampedCgpa * 9.5;
        formulaNote.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span><strong>Standard Rule:</strong> Percentage = CGPA &times; 9.5 (AICTE / CBSE 10-Pt)</span>
        `;
        primaryResultSub.textContent = 'Standard CBSE / AICTE 9.5 Conversion';
      } else {
        calculatedPercentage = (clampedCgpa / 7) * 100;
        formulaNote.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span><strong>Standard Rule:</strong> Percentage = (CGPA &divide; 7) &times; 100 (7-Pt Scale)</span>
        `;
        primaryResultSub.textContent = 'Standard 7-Point University Scale Conversion';
      }

      calculatedPercentage = Math.min(100, Math.max(0, calculatedPercentage));
      primaryResultLabel.textContent = 'Equivalent Percentage';
      primaryResultVal.textContent = `${formatDecimal(calculatedPercentage)}%`;

    } else {
      // Input is Percentage
      const clampedPct = Math.max(0, Math.min(inputVal, 100));
      calculatedPercentage = clampedPct;

      if (currentScale === 10) {
        calculatedCgpa = clampedPct / 9.5;
        formulaNote.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span><strong>Standard Rule:</strong> CGPA = Percentage &divide; 9.5 (Out of 10.0)</span>
        `;
        primaryResultSub.textContent = 'Out of 10.0 Point Scale';
      } else {
        calculatedCgpa = (clampedPct / 100) * 7;
        formulaNote.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span><strong>Standard Rule:</strong> CGPA = (Percentage &divide; 100) &times; 7 (Out of 7.0)</span>
        `;
        primaryResultSub.textContent = 'Out of 7.0 Point Scale';
      }

      calculatedCgpa = Math.min(currentScale, Math.max(0, calculatedCgpa));
      primaryResultLabel.textContent = `Equivalent CGPA (${currentScale}-pt)`;
      primaryResultVal.textContent = `${formatDecimal(calculatedCgpa, 2)} / ${currentScale}.0`;
    }

    // Update Academic Tier & Overseas Eligibility
    const tier = getAcademicTier(calculatedPercentage);
    gpaVal.textContent = tier.gpa;
    divisionVal.textContent = tier.division;
    eligibilityTag.textContent = tier.badge;
    abroadStatusText.textContent = tier.abroad;

    // Update Meter Fill (Percentage between 0 and 100)
    meterFill.style.width = `${calculatedPercentage.toFixed(2)}%`;
  }

  /**
   * Switch between conversion directions (CGPA to % vs % to CGPA)
   */
  function setDirection(direction) {
    currentDirection = direction;

    if (direction === 'cgpa-to-pct') {
      convCgpaToPctBtn.classList.add('active');
      convCgpaToPctBtn.setAttribute('aria-selected', 'true');
      convPctToCgpaBtn.classList.remove('active');
      convPctToCgpaBtn.setAttribute('aria-selected', 'false');

      scoreInputLabel.textContent = `Enter CGPA (Out of ${currentScale}.0)`;
      scoreUnit.textContent = 'CGPA';
      cgpaValueInput.min = '0';
      cgpaValueInput.max = currentScale.toString();
      cgpaValueInput.step = '0.05';
      cgpaValueInput.value = currentScale === 10 ? '8.5' : '5.8';

      cgpaSlider.min = '0';
      cgpaSlider.max = currentScale.toString();
      cgpaSlider.step = '0.05';
      cgpaSlider.value = cgpaValueInput.value;

      sliderMinVal.textContent = '0.0';
      sliderMaxVal.textContent = `${currentScale}.0`;
    } else {
      convPctToCgpaBtn.classList.add('active');
      convPctToCgpaBtn.setAttribute('aria-selected', 'true');
      convCgpaToPctBtn.classList.remove('active');
      convCgpaToPctBtn.setAttribute('aria-selected', 'false');

      scoreInputLabel.textContent = 'Enter Total Percentage (%)';
      scoreUnit.textContent = '%';
      cgpaValueInput.min = '0';
      cgpaValueInput.max = '100';
      cgpaValueInput.step = '0.5';
      cgpaValueInput.value = '80';

      cgpaSlider.min = '0';
      cgpaSlider.max = '100';
      cgpaSlider.step = '0.5';
      cgpaSlider.value = '80';

      sliderMinVal.textContent = '0%';
      sliderMaxVal.textContent = '100%';
    }

    calculate();
  }

  /**
   * Switch between grading scales (10-Point vs 7-Point)
   */
  function setScale(scale) {
    currentScale = scale;

    if (scale === 10) {
      scale10Btn.classList.add('active');
      scale10Btn.setAttribute('aria-selected', 'true');
      scale7Btn.classList.remove('active');
      scale7Btn.setAttribute('aria-selected', 'false');
    } else {
      scale7Btn.classList.add('active');
      scale7Btn.setAttribute('aria-selected', 'true');
      scale10Btn.classList.remove('active');
      scale10Btn.setAttribute('aria-selected', 'false');
    }

    if (currentDirection === 'cgpa-to-pct') {
      scoreInputLabel.textContent = `Enter CGPA (Out of ${scale}.0)`;
      cgpaValueInput.max = scale.toString();
      cgpaSlider.max = scale.toString();
      sliderMaxVal.textContent = `${scale}.0`;

      if (parseFloat(cgpaValueInput.value) > scale) {
        cgpaValueInput.value = (scale * 0.85).toFixed(2);
        cgpaSlider.value = cgpaValueInput.value;
      }
    }

    calculate();
  }

  // Event Listeners
  if (cgpaValueInput && cgpaSlider) {
    // Input -> Slider Sync
    cgpaValueInput.addEventListener('input', function () {
      cgpaSlider.value = this.value;
      calculate();
    });

    // Slider -> Input Sync
    cgpaSlider.addEventListener('input', function () {
      cgpaValueInput.value = this.value;
      calculate();
    });
  }

  // Direction Toggle Buttons
  if (convCgpaToPctBtn && convPctToCgpaBtn) {
    convCgpaToPctBtn.addEventListener('click', function () {
      setDirection('cgpa-to-pct');
    });

    convPctToCgpaBtn.addEventListener('click', function () {
      setDirection('pct-to-cgpa');
    });
  }

  // Scale Toggle Buttons
  if (scale10Btn && scale7Btn) {
    scale10Btn.addEventListener('click', function () {
      setScale(10);
    });

    scale7Btn.addEventListener('click', function () {
      setScale(7);
    });
  }

  // Mobile Drawer Navigation Logic (if elements present)
  const drawerToggle = document.getElementById('drawer-toggle');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    if (drawer && drawerOverlay) {
      drawer.setAttribute('aria-expanded', 'true');
      drawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && drawerOverlay) {
      drawer.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (drawerToggle) drawerToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Initial Calculation Run
  calculate();
})();

