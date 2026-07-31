const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  const bodyText = await page.locator('body').textContent();
  for (const token of ['shop','checkout','cart','priority','board','drag','upload','employee']) {
    console.log(token, bodyText.toLowerCase().includes(token));
  }
  await browser.close();
})();
