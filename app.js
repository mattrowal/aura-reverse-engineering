/**
 * AURA — Pure Production Interface
 * State Machine & Interactions
 * Simplified text, professional styling, no emojis
 */

// Application State
const state = {
  profile: 'voyager', // 'voyager' | 'beacon' | 'guardian'
  enforcementEnabled: false,
  clarifyEnabled: false,
};

// Profile Metadata with Simplified, Clear Explanations (No Emojis)
const PROFILES = {
  voyager: {
    label: 'The Voyager (Color Blind)',
    title: 'The Voyager (Color Blind)',
    summary: 'Uses colors and shapes that are easier to see.',
    features: [
      'Uses blue and cyan shades that are easy to tell apart.',
      'Uses labels, dots, and shapes so info is not based on color alone.',
      'Uses clear shapes to make buttons easy to recognize.'
    ]
  },
  beacon: {
    label: 'The Beacon (Low Vision)',
    title: 'The Beacon (Low Vision)',
    summary: 'Makes text, buttons, and spacing larger so the screen is easy to read.',
    features: [
      'Makes text larger with more line spacing for easy reading.',
      'Makes buttons bigger so they are easy to see and click.',
      'Adds bright yellow borders to highlight important items.'
    ]
  },
  guardian: {
    label: 'The Guardian (Eye Strain)',
    title: 'The Guardian (Eye Strain)',
    summary: 'Reduces bright light and strong contrast to protect your eyes.',
    features: [
      'Uses a soft dark background instead of pure black.',
      'Lowers bright glow effects and screen glare.',
      'Uses soft white text to make reading comfortable.'
    ]
  }
};

// Simplified Copy Definitions
const COPY = {
  normal: {
    headingLine1: 'The Guardian of',
    headingLine2: '<span class="gradient-accent">Accessibility.</span>',
    body: 'Aura works across your apps to find and fix screen problems in real time. It makes every program easy for everyone to use.',
  },
  clarified: {
    headingLine1: 'The <span class="gradient-accent">Guardian</span> for',
    headingLine2: 'everyone.',
    body: 'Aura helps you use any app easily. It fixes screen problems in real time and keeps your data private.',
  },
};

// DOM Elements Cache
const DOM = {
  body: document.body,
  profileTrigger: document.getElementById('profile-trigger'),
  profileSelectedText: document.getElementById('profile-selected-text'),
  profileMenu: document.getElementById('profile-menu'),
  profileOptions: document.querySelectorAll('.profile-option-item'),
  resetAccessBtn: document.getElementById('reset-access-btn'),
  enforceBtn: document.getElementById('enforce-btn'),
  enforceStateIndicator: document.getElementById('enforce-state-indicator'),
  clarifyToggleBtn: document.getElementById('clarify-toggle-btn'),
  clarifyStatusBadge: document.getElementById('clarify-status-badge'),
  heroHeading: document.getElementById('hero-heading'),
  headingLine1: document.getElementById('heading-line-1'),
  headingLine2: document.getElementById('heading-line-2'),
  heroBody: document.getElementById('hero-body'),
  ctaDownload: document.getElementById('cta-download'),
  ctaVision: document.getElementById('cta-vision'),
  modeBadge: document.getElementById('mode-badge'),
  demoToast: document.getElementById('demo-toast'),
  demoToastMessage: document.getElementById('demo-toast-message'),
  infoProfileTitle: document.getElementById('info-profile-title'),
  infoProfileSummary: document.getElementById('info-profile-summary'),
  infoFeaturesList: document.getElementById('info-features-list'),
  infoResetBtn: document.getElementById('info-reset-btn'),
};

let toastTimeout = null;

/**
 * Toast Notification for Demoware buttons & Reset confirmation
 */
function showToast(message) {
  if (toastTimeout) clearTimeout(toastTimeout);
  DOM.demoToastMessage.textContent = message;
  DOM.demoToast.classList.add('visible');
  toastTimeout = setTimeout(() => {
    DOM.demoToast.classList.remove('visible');
  }, 2800);
}

/**
 * Update UI Copy & Formatting for Clarify Content
 */
function renderClarifyState() {
  const isClarified = state.clarifyEnabled;
  DOM.clarifyToggleBtn.setAttribute('aria-checked', String(isClarified));
  
  if (DOM.clarifyStatusBadge) {
    DOM.clarifyStatusBadge.textContent = isClarified ? 'ON' : 'OFF';
  }

  if (isClarified) {
    DOM.clarifyToggleBtn.classList.add('active');
    DOM.heroHeading.classList.add('clarified');
    DOM.heroBody.classList.add('clarified');
    DOM.headingLine1.innerHTML = COPY.clarified.headingLine1;
    DOM.headingLine2.innerHTML = COPY.clarified.headingLine2;
    DOM.heroBody.textContent = COPY.clarified.body;
  } else {
    DOM.clarifyToggleBtn.classList.remove('active');
    DOM.heroHeading.classList.remove('clarified');
    DOM.heroBody.classList.remove('clarified');
    DOM.headingLine1.innerHTML = COPY.normal.headingLine1;
    DOM.headingLine2.innerHTML = COPY.normal.headingLine2;
    DOM.heroBody.textContent = COPY.normal.body;
  }
}

/**
 * Update Active Profile Information Panel
 */
function renderProfileInfo() {
  const profileData = PROFILES[state.profile];
  if (!profileData) return;

  if (DOM.infoProfileTitle) {
    DOM.infoProfileTitle.textContent = profileData.title;
  }
  if (DOM.infoProfileSummary) {
    DOM.infoProfileSummary.textContent = profileData.summary;
  }
  if (DOM.infoFeaturesList) {
    DOM.infoFeaturesList.innerHTML = profileData.features.map(text => `
      <li class="info-feature-item">
        <span class="feature-text">${text}</span>
      </li>
    `).join('');
  }
}

/**
 * Update UI for Profile Selection
 */
function renderProfileState() {
  DOM.body.dataset.profile = state.profile;
  DOM.profileSelectedText.textContent = PROFILES[state.profile].label;

  DOM.profileOptions.forEach((opt) => {
    const isSelected = opt.dataset.profile === state.profile;
    opt.classList.toggle('selected', isSelected);
    opt.setAttribute('aria-selected', String(isSelected));
  });

  renderProfileInfo();
}

/**
 * Update UI for Enforcement Toggle
 */
function renderEnforceState() {
  const isEnforced = state.enforcementEnabled;
  DOM.enforceBtn.setAttribute('aria-pressed', String(isEnforced));
  
  const labelEl = document.getElementById('enforce-btn-label') || DOM.enforceBtn;
  if (DOM.enforceStateIndicator) {
    DOM.enforceStateIndicator.textContent = isEnforced ? '●' : '○';
  }

  if (DOM.modeBadge) {
    DOM.modeBadge.innerHTML = isEnforced 
      ? '<span class="mode-glyph" aria-hidden="true">■</span> ENFORCING'
      : '<span class="mode-glyph" aria-hidden="true">○</span> STANDBY';
  }

  if (isEnforced) {
    DOM.enforceBtn.classList.add('active');
    document.body.classList.add('enforcing-active');
    labelEl.textContent = 'Stop Enforcement';
  } else {
    DOM.enforceBtn.classList.remove('active');
    document.body.classList.remove('enforcing-active');
    labelEl.textContent = 'Simulate Aura Enforcer';
  }
}

/**
 * Dropdown Menu Handlers
 */
function toggleDropdown(show) {
  const isExpanded = DOM.profileTrigger.getAttribute('aria-expanded') === 'true';
  const shouldOpen = typeof show === 'boolean' ? show : !isExpanded;
  
  DOM.profileTrigger.setAttribute('aria-expanded', String(shouldOpen));
  DOM.profileMenu.classList.toggle('open', shouldOpen);
}

function closeDropdown() {
  toggleDropdown(false);
}

/**
 * Reset Accessibility Settings to Default
 */
function resetAccessibility() {
  state.profile = 'voyager';
  state.enforcementEnabled = false;
  state.clarifyEnabled = false;

  closeDropdown();
  renderProfileState();
  renderClarifyState();
  renderEnforceState();

  showToast('Settings reset to default');
}

/**
 * Event Listeners Initialization
 */
function setupEventListeners() {
  // Reset Accessibility Buttons (Header and Info Card)
  if (DOM.resetAccessBtn) {
    DOM.resetAccessBtn.addEventListener('click', () => {
      resetAccessibility();
    });
  }

  if (DOM.infoResetBtn) {
    DOM.infoResetBtn.addEventListener('click', () => {
      resetAccessibility();
    });
  }

  // Enforcement Button Toggle
  DOM.enforceBtn.addEventListener('click', () => {
    state.enforcementEnabled = !state.enforcementEnabled;
    renderEnforceState();
  });

  // Clarify Toggle
  DOM.clarifyToggleBtn.addEventListener('click', () => {
    state.clarifyEnabled = !state.clarifyEnabled;
    renderClarifyState();
  });

  // Profile Trigger
  DOM.profileTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // Profile Option Selection
  DOM.profileOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const newProfile = option.dataset.profile;
      if (newProfile && PROFILES[newProfile]) {
        state.profile = newProfile;
        renderProfileState();
        closeDropdown();
      }
    });

    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        option.click();
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!DOM.profileTrigger.contains(e.target) && !DOM.profileMenu.contains(e.target)) {
      closeDropdown();
    }
  });

  // Keyboard accessibility for dropdown (Escape closes)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      DOM.profileTrigger.focus();
    }
  });

  // Demoware CTA Buttons
  DOM.ctaDownload.addEventListener('click', () => {
    showToast('Demo only — download not available');
  });

  DOM.ctaVision.addEventListener('click', () => {
    showToast('Demo only — video not available');
  });
}

/**
 * Application Bootstrap
 */
function init() {
  renderProfileState();
  renderClarifyState();
  renderEnforceState();
  setupEventListeners();
}

// Start on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
