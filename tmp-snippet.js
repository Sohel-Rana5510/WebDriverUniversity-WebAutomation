const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  const content = await page.content();
  const idx = content.indexOf('Employee Directory');
  console.log(content.slice(Math.max(0, idx - 1200), Math.min(content.length, idx + 2000)));
  await browser.close();
})();
