const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://webdriveruniversity.com/AI-Playground/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');
  const content = await page.content();
  const tags = ['Dynamic Selectors','Flaky Loader','Multi-Step Form','Race Condition','iFrame Login','Employee Directory','File Upload','Priority Board','Shop & Checkout','Checkout'];
  for (const tag of tags) {
    console.log(tag, content.includes(tag));
  }
  await browser.close();
})();
