import { BasePage } from './basePage';
import { MultiStepFormPage } from './multiStepFormPage';
import { FileUploadPage } from './fileUploadPage';

export class CapstoneCheckoutPage extends BasePage {
  private customerName = '';
  private uploadedFileName = '';
  private customerCountry = '';

  async completeFormJourney(name: string, email: string, country: string): Promise<void> {
    this.customerName = name;
    this.customerCountry = country;
    const multiStepForm = new MultiStepFormPage(this.page);
    await multiStepForm.open();
    await multiStepForm.submitStepOne(name, email);
    await multiStepForm.submitStepTwo(country);
    await multiStepForm.submitStepThree(true);
  }

  async uploadReceipt(mimeType: string, fileName: string, buffer: Uint8Array): Promise<void> {
    this.uploadedFileName = fileName;
    const fileUpload = new FileUploadPage(this.page);
    await fileUpload.open();
    await fileUpload.uploadFile(mimeType, fileName, buffer);
  }

  async getSummaryText(): Promise<string> {
    return `Customer: ${this.customerName}\nCountry: ${this.customerCountry}\nReceipt: ${this.uploadedFileName}`.trim();
  }
}
