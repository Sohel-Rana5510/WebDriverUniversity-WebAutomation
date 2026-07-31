const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  const headings = await page.locator('h2').allTextContents();
  console.log(headings);
  await browser.close();
})();
