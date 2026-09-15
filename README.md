# AURA — Accessibility Enforcer (Interactive Simulation)

A pixel-faithful reverse engineering of the **AURA Accessibility Enforcer** product landing page and interactive simulation.

---

##  Project Overview

AURA is a single-page product concept showcasing an on-device accessibility enforcement layer. The landing page demonstrates an interactive simulation of real-time accessibility overlays, profile adaptations, and dynamic content clarification.

> **Demo Limitation**: This application is a local browser simulation reproducing the demonstrated UI and interactions. No backend server, operating-system hook, active desktop window scanning, or machine learning model is demonstrated or executed.

---

##  Quick Start (Local Run Instructions)

### Prerequisites
- Node.js (v18+) and npm

### Installation & Execution

1. Navigate to the project directory:
   ```bash
   cd "c:\komvux apl\reverse"
   ```

2. Install dependencies (Vite dev server):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173/` in your browser. The default view is calibrated for a `1920 × 866` viewport.

---

##  Interactive State Model

The application maintains three independent state variables:

| State Variable | Type | Options | Initial Value |
|---|---|---|---|
| `profile` | string | `'voyager'` \| `'beacon'` \| `'guardian'` | `'voyager'` |
| `enforcementEnabled` | boolean | `true` \| `false` | `true` |
| `clarifyEnabled` | boolean | `true` \| `false` | `true` |

### Key Controls
- **Simulate Aura Enforcer / Stop Enforcement**: Toggles the accessibility enforcement overlay engine.
  - **On**: Outlines targets with active profile color, soft glow, translucent tint, upper classification tags, and lower badges. Active button fills with profile accent.
  - **Off**: Reverts button to a dark pill and hides all overlay annotations.
- **Clarify Content**: Toggles simplified cognitive accessibility copy.
  - **On**: Heading changes to `"The Guardian for everyone."` with expanded letter-spacing and vertical line-height; paragraph switches to simplified copy.
  - **Off**: Heading changes to `"The Guardian of Accessibility."` with standard typography and original paragraph.
- **Profile Selector**:
  - **The Voyager (Color Blind)**: Electric blue palette (`#3B82F6`) with white upper tag text.
  - **The Beacon (Low Vision)**: Amber/gold palette (`#FBBF24`) with dark upper tag text (`#0A0D18`).
  - **The Guardian (Eye Strain)**: Documented emerald fallback (`#10B981`).
- **Demoware CTAs**: Clicking `"Download for Windows"` or `"Watch the Vision"` triggers an accessible toast notification (`"Demo only — asset not supplied"`).

---

##  Forensic Reference Comparison

| State | Reference Timestamp | Description | Verification Screenshot |
|---|---|---|---|
| **State 1** | `0:00` | Initial load: Voyager, Enforcement ON, Clarify ON | `state_1_voyager_enforce_on_clarify_on.png` |
| **State 2** | `0:16` | Voyager, Enforcement OFF, Clarify ON | `state_2_voyager_enforce_off_clarify_on.png` |
| **State 3** | `0:30` | Voyager, Enforcement OFF, Clarify OFF | `state_3_voyager_enforce_off_clarify_off.png` |
| **State 4** | `1:50` | Voyager, Enforcement ON, Clarify OFF | `state_4_voyager_enforce_on_clarify_off.png` |
| **State 5** | `2:10` | Beacon, Enforcement ON, Clarify OFF | `state_5_beacon_enforce_on_clarify_off.png` |
| **State 6** | `2:30` | Beacon, Enforcement ON, Clarify ON | `state_6_beacon_enforce_on_clarify_on.png` |
| **State 7** | `3:20` | Lower section: Universal Empowerment & 3 Feature Cards | `state_7_beacon_lower_section.png` |

For detailed analysis of observed vs. inferred features, see [ASSUMPTIONS.md](./ASSUMPTIONS.md).
