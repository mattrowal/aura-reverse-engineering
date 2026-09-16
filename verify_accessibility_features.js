import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\matil\\.gemini\\antigravity-ide\\brain\\536d998f-3b00-4bf9-8c8a-56de91c1d872';

async function run() {
  console.log('Launching Chrome for Accessibility Features verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1920, height: 866 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 866 });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 600));

  // 1. Initial State: The Voyager (Color Blind) default
  console.log('Capturing State 1: The Voyager Default...');
  await page.screenshot({ path: path.join(OUT_DIR, '01_voyager_default.png') });

  // 2. Dropdown open
  console.log('Opening Profile Dropdown...');
  await page.click('#profile-trigger');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT_DIR, '02_profile_dropdown_open.png') });

  // 3. Select The Guardian (Eye Strain)
  console.log('Selecting The Guardian (Eye Strain)...');
  await page.click('#opt-guardian');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT_DIR, '03_guardian_eye_strain.png') });

  // 4. Select The Beacon (Low Vision)
  console.log('Opening Profile Dropdown and Selecting The Beacon...');
  await page.click('#profile-trigger');
  await new Promise(r => setTimeout(r, 300));
  await page.click('#opt-beacon');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT_DIR, '04_beacon_low_vision.png') });

  // 5. Test Simulate Aura Enforcer (with Beacon)
  console.log('Activating Simulate Aura Enforcer...');
  await page.click('#enforce-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT_DIR, '05_beacon_enforcer_active.png') });

  // 6. Test Clarify Content toggle (with Beacon + Enforcer)
  console.log('Activating Clarify Content toggle...');
  await page.click('#clarify-toggle-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT_DIR, '06_beacon_clarify_and_enforcer_active.png') });

  // 7. Test Reset Accessibility Button
  console.log('Clicking Reset Accessibility button...');
  await page.click('#reset-access-btn');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT_DIR, '07_after_reset_default_with_toast.png') });

  // 8. Lower section capture
  console.log('Scrolling to Lower section...');
  await page.evaluate(() => {
    window.scrollTo({ top: 620, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, '08_lower_section.png') });

  // 9. Mobile responsive viewport test (390x844)
  console.log('Testing Mobile responsive viewport (390x844)...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, '09_mobile_responsive.png') });

  await browser.close();
  console.log('All verification captures completed successfully!');
}

run().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
