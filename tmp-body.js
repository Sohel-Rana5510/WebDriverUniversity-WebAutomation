const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(10000);
  console.log(await page.locator('body').textContent());
  console.log('html', await page.locator('body').innerHTML());
  await browser.close();
})();
