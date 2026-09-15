import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\matil\\.gemini\\antigravity-ide\\brain\\47fc50da-a15c-448e-8673-cb2f367ee5f9';

async function run() {
  console.log('Launching Chrome...');
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

  // State 1: 0:00 equivalent (Voyager, Enforce ON, Clarify ON)
  console.log('Capturing State 1 (Voyager, Enforce ON, Clarify ON)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_1_voyager_enforce_on_clarify_on.png') });

  // State 2: 0:16 equivalent (Voyager, Enforce OFF, Clarify ON)
  console.log('Toggling enforcement OFF...');
  await page.click('#enforce-btn');
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing State 2 (Voyager, Enforce OFF, Clarify ON)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_2_voyager_enforce_off_clarify_on.png') });

  // State 3: 0:30 equivalent (Voyager, Enforce OFF, Clarify OFF)
  console.log('Toggling clarify OFF...');
  await page.click('#clarify-toggle-btn');
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing State 3 (Voyager, Enforce OFF, Clarify OFF)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_3_voyager_enforce_off_clarify_off.png') });

  // State 4: 1:50 equivalent (Voyager, Enforce ON, Clarify OFF)
  console.log('Toggling enforcement ON...');
  await page.click('#enforce-btn');
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing State 4 (Voyager, Enforce ON, Clarify OFF)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_4_voyager_enforce_on_clarify_off.png') });

  // Dropdown open test
  console.log('Opening profile dropdown...');
  await page.click('#profile-trigger');
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT_DIR, 'state_dropdown_open.png') });

  // State 5: 2:10 equivalent (Beacon, Enforce ON, Clarify OFF)
  console.log('Selecting Beacon profile...');
  await page.click('#opt-beacon');
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing State 5 (Beacon, Enforce ON, Clarify OFF)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_5_beacon_enforce_on_clarify_off.png') });

  // State 6: 2:30 equivalent (Beacon, Enforce ON, Clarify ON)
  console.log('Toggling clarify ON...');
  await page.click('#clarify-toggle-btn');
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing State 6 (Beacon, Enforce ON, Clarify ON)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_6_beacon_enforce_on_clarify_on.png') });

  // State 7: 3:20 equivalent (Beacon lower section with 3 feature cards & footer)
  console.log('Scrolling to lower section...');
  await page.evaluate(() => {
    window.scrollTo({ top: 600, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing State 7 (Beacon lower section)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_7_beacon_lower_section.png') });

  // Toast test
  console.log('Testing CTA toast notification...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 300));
  await page.click('#cta-download');
  await new Promise(r => setTimeout(r, 300));
  console.log('Capturing CTA toast notification...');
  await page.screenshot({ path: path.join(OUT_DIR, 'state_toast.png') });

  // Mobile viewport test
  console.log('Testing responsive mobile viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT_DIR, 'state_8_mobile_responsive.png') });

  await browser.close();
  console.log('All verification states captured successfully!');
}

run().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
