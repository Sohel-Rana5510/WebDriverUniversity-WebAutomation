const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(15000);
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log(html.slice(0, 4000));
  await browser.close();
})();
