/**
 * AURA — Pure Production Interface
 * State Machine & Interactions (without diagnostic overlays)
 */

// Application State
const state = {
  profile: 'voyager', // 'voyager' | 'beacon' | 'guardian'
  enforcementEnabled: false,
  clarifyEnabled: false,
};

// Profile Metadata
const PROFILES = {
  voyager: {
    label: 'The Voyager (Color Blind)',
  },
  beacon: {
    label: 'The Beacon (Low Vision)',
  },
  guardian: {
    label: 'The Guardian (Eye Strain)',
  },
};

// Copy Definitions
const COPY = {
  normal: {
    headingLine1: 'The Guardian of',
    headingLine2: '<span class="gradient-accent">Accessibility.</span>',
    body: 'Intelligence that lives between your windows. Aura identifies, cleans, and fixes digital barriers in real-time, bringing inclusive experiences to every application on your machine.',
  },
  clarified: {
    headingLine1: 'The <span class="gradient-accent">Guardian</span> for',
    headingLine2: 'everyone.',
    body: 'Aura helps you use any app easily. It finds and fixes hard parts on your screen in real-time, keeping your data private.',
  },
};

// DOM Elements Cache
const DOM = {
  body: document.body,
  profileTrigger: document.getElementById('profile-trigger'),
  profileSelectedText: document.getElementById('profile-selected-text'),
  profileMenu: document.getElementById('profile-menu'),
  profileOptions: document.querySelectorAll('.profile-option-item'),
  enforceBtn: document.getElementById('enforce-btn'),
  clarifyToggleBtn: document.getElementById('clarify-toggle-btn'),
  heroHeading: document.getElementById('hero-heading'),
  headingLine1: document.getElementById('heading-line-1'),
  headingLine2: document.getElementById('heading-line-2'),
  heroBody: document.getElementById('hero-body'),
  ctaDownload: document.getElementById('cta-download'),
  ctaVision: document.getElementById('cta-vision'),
  demoToast: document.getElementById('demo-toast'),
  demoToastMessage: document.getElementById('demo-toast-message'),
};

let toastTimeout = null;

/**
 * Toast Notification for Demoware buttons
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
}

/**
 * Update UI for Enforcement Toggle
 */
function renderEnforceState() {
  const isEnforced = state.enforcementEnabled;
  DOM.enforceBtn.setAttribute('aria-pressed', String(isEnforced));
  
  const labelEl = document.getElementById('enforce-btn-label') || DOM.enforceBtn;
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
 * Event Listeners Initialization
 */
function setupEventListeners() {
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
    showToast('Demo only — asset not supplied');
  });

  DOM.ctaVision.addEventListener('click', () => {
    showToast('Demo only — asset not supplied');
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
