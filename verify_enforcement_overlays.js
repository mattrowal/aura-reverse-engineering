import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\matil\\.gemini\\antigravity-ide\\brain\\47fc50da-a15c-448e-8673-cb2f367ee5f9';

async function run() {
  console.log('Launching Chrome for overlay verification...');
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

  // 1. Initial State: Enforcer OFF (Clean UI)
  console.log('Capturing Initial Clean UI (Enforcer OFF)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'test_enforce_off_clean.png') });

  // 2. Click "Simulate Aura Enforcer" -> Enforcer ON
  console.log('Activating Simulate Aura Enforcer...');
  await page.click('#enforce-btn');
  await new Promise(r => setTimeout(r, 500));

  console.log('Capturing Active Enforcer UI (Overlays Visible, matching frame 01:55)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'test_enforce_on_hero.png') });

  // 3. Scroll to lower section with overlays active
  console.log('Scrolling to Lower Section with overlays active...');
  await page.evaluate(() => {
    window.scrollTo({ top: 620, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  console.log('Capturing Lower Section with Overlays (matching frame 03:10)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'test_enforce_on_lower.png') });

  // 4. Scroll back to top & Click "Stop Enforcement" -> Clean UI Returns
  console.log('Scrolling top & Clicking Stop Enforcement...');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 400));
  await page.click('#enforce-btn');
  await new Promise(r => setTimeout(r, 400));

  console.log('Capturing Returned Clean UI (Overlays Hidden)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'test_enforce_stopped_clean.png') });

  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
