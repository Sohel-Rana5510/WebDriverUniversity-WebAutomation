import { BasePage } from './basePage';

export class FileUploadPage extends BasePage {
  private readonly fileInput = this.page.locator('#file-input');
  private readonly submitButton = this.page.locator('#file-submit');
  private readonly result = this.page.locator('#file-result');
  private readonly error = this.page.locator('#file-error');

  async open(): Promise<void> {
    await super.open();
    await this.fileInput.waitFor();
    await this.waitTwoSeconds();
  }

  async uploadFile(mimeType: string, fileName: string, buffer: Uint8Array | Buffer): Promise<void> {
    // Clear previous result/error messages before uploading
    await this.page.evaluate(() => {
      const resultEl = document.getElementById('file-result');
      const errorEl = document.getElementById('file-error');
      if (resultEl) resultEl.textContent = '';
      if (errorEl) errorEl.textContent = '';
    });
    
    await this.fileInput.setInputFiles({ name: fileName, mimeType, buffer: Buffer.from(buffer) });
    await this.submitButton.click();
    await this.waitTwoSeconds();
  }

  async getResultText(): Promise<string> {
    return ((await this.result.textContent()) ?? '').trim();
  }

  async getErrorText(): Promise<string> {
    return ((await this.error.textContent()) ?? '').trim();
  }
}
