# AURA Architectural Analysis & Assumptions: Observed, Inferred, and Unknown

This document provides a strict, evidence-based accounting of the reverse-engineering process for the AURA product landing page and interactive accessibility-enforcement simulation, based directly on forensic inspection of the original `Aura.mp4` screen recording (1920 × 950 px, ~84 px browser chrome, effective viewport 1920 × 866 px).

---

## 1. Observed Evidence (Direct Ground Truth)

The following behaviors, dimensions, typography, and visual tokens were directly confirmed by video frame extraction and pixel inspection:

1. **Host Environment**:
   - The recording was executed in a desktop browser displaying a local HTML file (`file:///C:/Users/roosm/OneDrive/Desktop/apl project/aura/static/index.html`).
   - No backend endpoints, network requests, desktop window scanning, active AI model inference, or OS-level integrations were demonstrated or executed.
2. **Page Aesthetics & Layout**:
   - Background is an almost-black navy (`#020315` / RGB `[1, 2, 21]`).
   - A soft, large radial blue glow (`rgba(24, 64, 160, 0.4)`) is positioned behind the right-hand hero card area.
   - Header: AURA wordmark at the left (x ≈ 96 px) with a light blue-to-purple gradient. Three controls at right: profile dropdown, enforcement toggle button, and Clarify Content switch.
   - Hero Left Column: Starts at x ≈ 154 px. Badge at y ≈ 202 px (`Aura Enforcer | Alpha 0.1`); heading at y ≈ 295 px; paragraph beneath; CTA row at y ≈ 715 px in normal state.
   - Lower Section: Spans almost full desktop width with ~48 px outer padding and ~30 px gaps between 3 feature cards in a single row.
   - Document scrolls normally; header scrolls out of view.
3. **Exact Copy**:
   - **Wordmark**: `AURA`
   - **Badge**: `Aura Enforcer | Alpha 0.1`
   - **Profile Dropdown Options**:
     - `The Guardian (Eye Strain)`
     - `The Beacon (Low Vision)`
     - `The Voyager (Color Blind)`
   - **Enforcement Button**: `Simulate Aura Enforcer` (inactive) / `Stop Enforcement` (active).
   - **Clarify Content**: Switch label `Clarify Content`.
   - **Normal Heading**:
     `The Guardian of`
     `Accessibility.` (with `Accessibility.` rendered in a blue-to-purple gradient).
   - **Normal Paragraph**:
     `Intelligence that lives between your windows. Aura identifies, cleans, and fixes digital barriers in real-time, bringing inclusive experiences to every application on your machine.`
   - **Clarified Heading**:
     `The Guardian for`
     `everyone.` (with `Guardian` rendered in the blue-to-purple gradient across both enforcement ON and enforcement OFF frames at 0:00 and 0:16).
   - **Clarified Paragraph**:
     `Aura helps you use any app easily. It finds and fixes hard parts on your screen in real-time, keeping your data private.`
   - **Hero CTAs**: `Download for Windows`, `Watch the Vision`.
   - **Status Card**:
     `Scanning: Notepad.exe`
     `Fixes Applied: 12`
     `Mode: ENFORCING`
     (Static fixture; text does not dynamically change or count up).
   - **Universal Empowerment Subtitle**: `For the web, legacy apps, and everything in between.`
   - **Feature Card 1**: `Visual Enforcement` / `Auto-corrects low contrast, identifies unlabelled icons, and enlarges tiny touch targets.`
   - **Feature Card 2**: `Aura Narrative` / `A smart, localized TTS engine that describes the screen as you move, without the noise of traditional screen readers.`
   - **Feature Card 3**: `Vision Core` / `100% On-device AI. Your screen data never leaves your computer. Privacy is an accessibility right.`
   - **Footer**: `© 2026 Aura Systems. Part of the Tworam Ecosystem.`
4. **State Transitions & Palettes**:
   - Initial recorded state: `The Voyager (Color Blind)`, Enforcement ON, Clarify ON.
   - Voyager enforcement color: Electric blue (`#3B82F6` / `#427FEE`) outlines, soft matching glow, translucent fill, and button background. Top tags: electric blue background with white uppercase text.
   - Beacon enforcement color: Amber/gold (`#FBBF24` / `#F2BF28`) outlines, soft gold glow, translucent gold fill, and button background. Top tags: gold background with dark (`#0A0D18`) uppercase text.
   - Lower badges: Black background (`#000000`), white bold text.
   - Switching profile while enforcement is active immediately recolors all overlays and active button without resetting clarify mode.
   - Toggling Clarify Content alters line breaks, expands letter-spacing and vertical spacing, and changes copy independently of enforcement state.
   - Toggling enforcement removes all overlay outlines, tags, and badges, while preserving profile and clarify selection.
5. **Status Card Floating Motion**:
   - Frame-by-frame coordinate tracking of `Scanning: Notepad.exe` from t=30s to t=41s measured a continuous vertical oscillation between y=516 px and y=534 px (travel = 18 px, amplitude ±9 px) with a cycle period of 5.0 seconds.

---

## 2. Inferred Implementations (Reasonable Technical Derivations)

1. **Floating Animation Curve**:
   - Implemented as CSS `5.0s ease-in-out infinite` with keyframes `translateY(-9px)` to `translateY(9px)`.
2. **Overlay Tracking Architecture**:
   - Real-time `requestAnimationFrame` and event-driven layout synchronization (`resize`, `scroll`, font load) using `getBoundingClientRect()`.
   - Container has `pointer-events: none` to guarantee all interactive elements beneath remain 100% clickable and accessible.
3. **CTA Button Fallbacks**:
   - Neither `Download for Windows` nor `Watch the Vision` had a demonstrated destination in the video. Clicking either button triggers an accessible, non-blocking toast notification: `"Demo only — asset not supplied"`.
4. **Overlay Alignment Refinements**:
   - In the video reference, switching to clarified copy causes a slight overlap between adjacent tags/badges. In this implementation, target padding was tuned so that controls remain fully legible and usable while retaining the exact visual aesthetic.
5. **Responsive Stacking**:
   - Breakpoints at `1024px` and `768px` allow smooth column stacking on tablets and mobile devices while preserving the desktop layout at the reference `1920 × 866` resolution.
6. **Transitions**:
   - 180–220 ms ease transitions for button hover, toggle switch slide, and overlay color changes.

---

## 3. Unknowns & Non-Demonstrated Behaviors

1. **The Guardian Profile Palette**:
   - The video demonstrates `The Voyager` (blue) and `The Beacon` (gold). `The Guardian (Eye Strain)` is present in the dropdown menu but is never selected during the recording.
   - **Reconstruction Decision**: A documented emerald/cyan accent (`#10B981`) is provided as an inferred fallback, adhering to the same tag/badge structure.
2. **Default Page Load State**:
   - The video starts already initialized in `Voyager / Enforcement ON / Clarify ON`. Whether the original application defaulted to this state or was pre-toggled prior to recording is unknown. We initialized the app in this state to match the opening video frame.
3. **Download Package / Vision Video Media**:
   - No underlying installer executable or promotional video asset exists in the demo.
4. **Mobile & Tablet Design**:
   - The recording only captures a 1920 × 950 desktop browser window. Any responsive behaviors are implementation inferences.
