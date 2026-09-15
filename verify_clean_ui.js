import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\matil\\.gemini\\antigravity-ide\\brain\\47fc50da-a15c-448e-8673-cb2f367ee5f9';

async function run() {
  console.log('Launching Chrome for clean UI capture...');
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

  // 1. Clean Final Interface (Normal State matching 0:30 video reference)
  console.log('Capturing Clean Final Interface (Normal State)...');
  await page.screenshot({ path: path.join(OUT_DIR, 'clean_aura_normal_ui.png') });

  // 2. Clean Final Interface (Clarified State matching 0:16 video reference)
  console.log('Toggling Clarify Content ON...');
  await page.click('#clarify-toggle-btn');
  await new Promise(r => setTimeout(r, 400));
  console.log('Capturing Clean Clarified Interface...');
  await page.screenshot({ path: path.join(OUT_DIR, 'clean_aura_clarified_ui.png') });

  // 3. Clean Lower Section (Universal Empowerment & Feature Cards)
  console.log('Scrolling to Lower Section...');
  await page.evaluate(() => {
    window.scrollTo({ top: 620, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Clean Lower Section...');
  await page.screenshot({ path: path.join(OUT_DIR, 'clean_aura_lower_section.png') });

  // 4. Scroll back top & Capture Full Page
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 300));
  console.log('Capturing Clean Full Page...');
  await page.screenshot({ path: path.join(OUT_DIR, 'clean_aura_full_page.png'), fullPage: true });

  await browser.close();
  console.log('Clean UI verification screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
