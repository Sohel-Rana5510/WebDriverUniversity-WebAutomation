import { BasePage } from './basePage';

export class IframeLoginPage extends BasePage {
  private readonly frame = this.page.frameLocator('#login-frame');
  private readonly usernameInput = this.frame.locator('#frame-username');
  private readonly passwordInput = this.frame.locator('#frame-password');
  private readonly loginButton = this.frame.locator('#frame-submit');
  private readonly result = this.frame.locator('#frame-result');

  async open(): Promise<void> {
    await super.open();
    await this.page.locator('#login-frame').waitFor();
    await this.waitTwoSeconds();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitTwoSeconds();
  }

  async getResultText(): Promise<string> {
    return ((await this.result.textContent()) ?? '').trim();
  }
}
