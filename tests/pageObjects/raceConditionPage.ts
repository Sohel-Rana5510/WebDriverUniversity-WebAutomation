import { BasePage } from './basePage';

export class RaceConditionPage extends BasePage {
  private readonly raceAButton = this.page.locator('#race-a');
  private readonly raceBButton = this.page.locator('#race-b');
  private readonly result = this.page.locator('#race-result');

  async open(): Promise<void> {
    await super.open();
    await this.raceAButton.waitFor();
    await this.waitTwoSeconds();
  }

  async runBothRaces(): Promise<string> {
    await this.raceAButton.click();
    await this.raceBButton.click();
    await this.page.waitForFunction(() => {
      const result = document.querySelector('#race-result');
      return result?.textContent?.includes('won!');
    }, { timeout: 10000 });
    await this.waitTwoSeconds();
    return this.getResultText();
  }

  async getResultText(): Promise<string> {
    return ((await this.result.textContent()) ?? '').trim();
  }
}
