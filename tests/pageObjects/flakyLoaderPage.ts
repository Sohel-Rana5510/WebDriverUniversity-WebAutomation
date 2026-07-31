import { BasePage } from './basePage';

export class FlakyLoaderPage extends BasePage {
  private readonly triggerButton = this.page.getByRole('button', { name: 'Load Content' });
  private readonly content = this.page.getByText('Content loaded successfully!');
  private readonly loading = this.page.getByText('Loading...');
  private readonly actionButton = this.page.getByRole('button', { name: 'Click Me Now' });

  async open(): Promise<void> {
    await super.open();
    await this.triggerButton.waitFor();
    await this.waitTwoSeconds();
  }

  async triggerLoader(): Promise<void> {
    await this.triggerButton.click();
    await this.loading.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await this.content.waitFor({ state: 'visible', timeout: 30000 });
    await this.waitTwoSeconds();
  }

  async isContentVisible(): Promise<boolean> {
    return this.content.isVisible();
  }

  async getContentText(): Promise<string> {
    return ((await this.content.textContent()) ?? '').trim();
  }

  async getActionText(): Promise<string> {
    return ((await this.actionButton.textContent()) ?? '').trim();
  }
}
