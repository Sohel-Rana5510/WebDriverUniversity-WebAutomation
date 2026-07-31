import { BasePage } from './basePage';

export class EmployeeDirectoryPage extends BasePage {
  private readonly filterInput = this.page.locator('#table-filter');
  private readonly table = this.page.locator('#employee-table');
  private readonly rowLocator = this.page.locator('#employee-tbody tr');

  async open(): Promise<void> {
    await super.open();
    await this.table.waitFor();
    await this.waitTwoSeconds();
  }

  async filterByText(text: string): Promise<void> {
    await this.filterInput.fill(text);
    await this.page.waitForFunction(() => document.querySelector('#employee-tbody')?.children.length !== undefined, { timeout: 10000 });
    await this.waitTwoSeconds();
  }

  async sortByColumn(column: string): Promise<void> {
    const header = this.table.locator(`th[data-col="${column}"]`);
    await header.click();
    await header.click();
    await this.waitTwoSeconds();
  }

  async getVisibleRows(): Promise<string[]> {
    return this.rowLocator.allTextContents();
  }
}
