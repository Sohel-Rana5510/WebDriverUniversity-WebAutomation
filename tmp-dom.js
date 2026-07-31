const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  const matches = await page.evaluate(() => Array.from(document.querySelectorAll('*')).filter(el => el.textContent && el.textContent.includes('Employee Directory')).map(el => ({ tag: el.tagName, text: el.textContent.trim(), html: el.outerHTML.slice(0, 1000) })));
  console.log(JSON.stringify(matches.slice(0, 10), null, 2));
  await browser.close();
})();
