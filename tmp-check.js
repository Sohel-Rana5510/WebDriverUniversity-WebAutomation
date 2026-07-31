const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('console:', msg.text()));
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(20000);
  console.log('final url', page.url());
  console.log('title', await page.title());
  const body = await page.textContent('body');
  console.log('body', body.slice(0, 4000));
  await browser.close();
})();
