import { BasePage } from './basePage';

export class DynamicSelectorsPage extends BasePage {
  private readonly card = this.page.locator('[data-testid="dynamic-login-card"]');
  private readonly usernameInput = this.card.locator('input[placeholder="Username"]');
  private readonly passwordInput = this.card.locator('input[placeholder="Password"]');
  private readonly loginButton = this.card.locator('button');
  private readonly errorMessage = this.card.locator('#dynamic-error');
  private readonly successMessage = this.card.locator('#dynamic-success');

  async open(): Promise<void> {
    await super.open();
    await this.card.waitFor();
    await this.waitTwoSeconds();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.successMessage.waitFor({ state: 'visible', timeout: 10000 }).catch(() => undefined);
    await this.waitTwoSeconds();
  }

  async isSuccessVisible(): Promise<boolean> {
    return this.successMessage.isVisible();
  }

  async getSuccessText(): Promise<string> {
    return ((await this.successMessage.textContent()) ?? '').trim();
  }

  async getErrorText(): Promise<string> {
    if (await this.errorMessage.isHidden()) {
      return '';
    }
    return ((await this.errorMessage.textContent()) ?? '').trim();
  }
}
