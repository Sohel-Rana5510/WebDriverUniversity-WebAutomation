import { BasePage } from './basePage';

export class MultiStepFormPage extends BasePage {
  private readonly stepText = this.page.locator('#step-text');
  private readonly nameInput = this.page.locator('#ms-name');
  private readonly emailInput = this.page.locator('#ms-email');
  private readonly nameError = this.page.locator('#ms-name-err');
  private readonly emailError = this.page.locator('#ms-email-err');
  private readonly nextButtonOne = this.page.locator('#ms-next-1');
  private readonly countrySelect = this.page.locator('#ms-country');
  private readonly countryError = this.page.locator('#ms-country-err');
  private readonly nextButtonTwo = this.page.locator('#ms-next-2');
  private readonly termsCheckbox = this.page.locator('#ms-terms');
  private readonly termsError = this.page.locator('#ms-terms-err');
  private readonly submitButton = this.page.locator('#ms-submit');
  private readonly completionMessage = this.page.locator('#step-done');

  async open(): Promise<void> {
    await super.open();
    await this.nameInput.waitFor();
    await this.waitTwoSeconds();
  }

  async submitStepOne(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.nextButtonOne.click();
    await this.waitTwoSeconds();
  }

  async getStepOneErrorText(): Promise<string> {
    return ((await this.emailError.textContent()) ?? '').trim();
  }

  async submitStepOneAndAdvance(name: string, email: string): Promise<void> {
    await this.submitStepOne(name, email);
  }

  async submitStepTwo(country: string): Promise<void> {
    await this.countrySelect.selectOption(country);
    await this.nextButtonTwo.click();
    await this.waitTwoSeconds();
  }

  async submitStepThree(acceptTerms: boolean): Promise<void> {
    if (acceptTerms) {
      await this.termsCheckbox.check();
    }
    await this.submitButton.click();
    await this.waitTwoSeconds();
  }

  async getCurrentStepText(): Promise<string> {
    return ((await this.stepText.textContent()) ?? '').trim();
  }

  async getSelectedCountry(): Promise<string> {
    return (await this.countrySelect.inputValue()).trim();
  }

  async getCompletionText(): Promise<string> {
    return ((await this.completionMessage.textContent()) ?? '').trim();
  }
}
