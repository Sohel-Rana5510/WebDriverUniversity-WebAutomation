import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  protected readonly url = 'https://webdriveruniversity.com/AI-Playground/index.html';

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.page.getByRole('heading', { level: 1, name: /AI Testing Playground/i }).waitFor({ timeout: 90000 });
    await this.page.locator('h2').filter({ hasText: 'Dynamic Selectors' }).first().waitFor({ timeout: 90000 });
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  protected async waitTwoSeconds(): Promise<void> {
    await this.page.waitForTimeout(2000);
  }
}
