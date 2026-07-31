const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body?.innerText?.includes('Dynamic Selectors'), { timeout: 90000 });
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log(html.includes('task-card'));
  console.log(html.includes('backlog-column'));
  console.log(html.includes('inprogress-column'));
  console.log(html.includes('board-result'));
  console.log(html.slice(0, 3000));
  await browser.close();
})();
