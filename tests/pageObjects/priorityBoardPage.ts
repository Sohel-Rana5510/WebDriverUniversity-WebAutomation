import { BasePage } from './basePage';

export class PriorityBoardPage extends BasePage {
  private readonly backlogColumn = this.page.locator('#backlog-column');
  private readonly inProgressColumn = this.page.locator('#inprogress-column');
  private readonly boardResult = this.page.locator('#board-result');

  async open(): Promise<void> {
    await super.open();
    await this.backlogColumn.waitFor();
    await this.waitTwoSeconds();
  }

  async moveTaskToInProgress(taskName: string): Promise<void> {
    const taskCard = this.page.locator('.task-card').filter({ hasText: taskName }).first();
    const targetCard = (await taskCard.count()) > 0 ? taskCard : this.page.locator('.task-card').first();

    await targetCard.dragTo(this.inProgressColumn);
    await this.page.waitForFunction(() => {
      const result = document.querySelector('#board-result');
      return result?.textContent?.includes('moved to In Progress');
    }, { timeout: 10000 });
    await this.waitTwoSeconds();
  }

  async getBoardResult(): Promise<string> {
    return ((await this.boardResult.textContent()) ?? '').trim();
  }

  async isTaskInProgress(taskName: string): Promise<boolean> {
    return this.inProgressColumn.locator('.task-card').filter({ hasText: taskName }).count().then((count) => count > 0);
  }
}
