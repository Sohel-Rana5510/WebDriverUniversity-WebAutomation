import { test, expect } from '@playwright/test';
import { DynamicSelectorsPage } from './pageObjects/dynamicSelectorsPage';
import { FlakyLoaderPage } from './pageObjects/flakyLoaderPage';
import { MultiStepFormPage } from './pageObjects/multiStepFormPage';
import { RaceConditionPage } from './pageObjects/raceConditionPage';
import { IframeLoginPage } from './pageObjects/iframeLoginPage';
import { EmployeeDirectoryPage } from './pageObjects/employeeDirectoryPage';
import { FileUploadPage } from './pageObjects/fileUploadPage';
import { PriorityBoardPage } from './pageObjects/priorityBoardPage';
import { CapstoneCheckoutPage } from './pageObjects/capstoneCheckoutPage';

test.describe('AI Playground challenge suite', () => {
  test('dynamic selectors login completes with stable selectors', async ({ page }) => {
    const dynamicSelectors = new DynamicSelectorsPage(page);
    await dynamicSelectors.open();
    await dynamicSelectors.login('admin', 'secret');

    await expect(await dynamicSelectors.isSuccessVisible()).toBeTruthy();
    const successText = await dynamicSelectors.getSuccessText();
    await expect(successText).not.toBe('');
    await expect(successText).toMatch(/logged in|success/i);
    await expect(await dynamicSelectors.getErrorText()).toBe('');
  });

  test('flaky loader reveals content once the delayed element appears', async ({ page }) => {
    const flakyLoader = new FlakyLoaderPage(page);
    await flakyLoader.open();
    await flakyLoader.triggerLoader();

    await expect(await flakyLoader.isContentVisible()).toBeTruthy();
    const contentText = await flakyLoader.getContentText();
    await expect(contentText).toContain('Content loaded successfully');
    await expect(await flakyLoader.getActionText()).toContain('Click Me Now');
  });

  test('multi-step form validates each step and completes the journey', async ({ page }) => {
    const multiStepForm = new MultiStepFormPage(page);
    await multiStepForm.open();

    await multiStepForm.submitStepOne('Jane Doe', 'invalid-email');
    await expect(await multiStepForm.getStepOneErrorText()).toContain('Valid email required');
    await expect(await multiStepForm.getCurrentStepText()).toContain('Step 1');

    await multiStepForm.submitStepOne('Jane Doe', 'jane@example.com');
    await expect(await multiStepForm.getCurrentStepText()).toContain('Step 2');

    await multiStepForm.submitStepTwo('UK');
    await expect(await multiStepForm.getSelectedCountry()).toBe('UK');
    await expect(await multiStepForm.getCurrentStepText()).toContain('Step 3');

    await multiStepForm.submitStepThree(true);
    const completionText = await multiStepForm.getCompletionText();
    await expect(completionText).toContain('Form submitted successfully');
  });

  test('race condition produces a single winner', async ({ page }) => {
    const raceCondition = new RaceConditionPage(page);
    await raceCondition.open();
    const winner = await raceCondition.runBothRaces();

    await expect(winner).toMatch(/Race (A|B)/i);
    await expect(winner).toContain('won!');
    await expect(winner).not.toContain('and');
    await expect(await raceCondition.getResultText()).toContain('won!');
  });

  test('iframe login accepts the expected credentials', async ({ page }) => {
    const iframeLogin = new IframeLoginPage(page);
    await iframeLogin.open();
    await iframeLogin.login('admin', 'secret123');

    const resultText = await iframeLogin.getResultText();
    await expect(resultText).toContain('Login successful');
    await expect(resultText).toMatch(/success/i);
  });

  test('employee directory filters and sorts the expected rows', async ({ page }) => {
    const employeeDirectory = new EmployeeDirectoryPage(page);
    await employeeDirectory.open();
    await employeeDirectory.filterByText('engineering');

    const filteredRows = await employeeDirectory.getVisibleRows();
    await expect(filteredRows.length).toBeGreaterThan(0);
    await expect(filteredRows.every((row: string) => row.toLowerCase().includes('engineering'))).toBeTruthy();

    await employeeDirectory.sortByColumn('salary');
    const sortedRows = await employeeDirectory.getVisibleRows();
    await expect(sortedRows[0]).toContain('Daniel Wright');
    await expect(sortedRows[0]).toContain('£55,000');
  });

  test('file upload validator accepts a valid file and blocks unsupported inputs', async ({ page }) => {
    const fileUpload = new FileUploadPage(page);
    await fileUpload.open();

    await fileUpload.uploadFile('image/png', 'sample.png', Buffer.from('not-a-real-png'));
    await expect(await fileUpload.getResultText()).toContain('File accepted');
    await expect(await fileUpload.getErrorText()).toBe('');

    await fileUpload.uploadFile('text/plain', 'notes.txt', Buffer.from('hello'));
    await expect(await fileUpload.getErrorText()).toContain('Invalid file type');
    await expect(await fileUpload.getResultText()).toBe('');
  });

  test('priority board moves a task card into progress', async ({ page }) => {
    const priorityBoard = new PriorityBoardPage(page);
    await priorityBoard.open();
    await expect(await priorityBoard.isTaskInProgress('Fix login bug')).toBeFalsy();

    await priorityBoard.moveTaskToInProgress('Fix login bug');
    await expect(await priorityBoard.isTaskInProgress('Fix login bug')).toBeTruthy();
    await expect(await priorityBoard.getBoardResult()).toContain('moved to In Progress');
  });

  test('capstone flow completes a purchase-like journey using the available challenge widgets', async ({ page }) => {
    const capstone = new CapstoneCheckoutPage(page);
    await capstone.open();
    await capstone.completeFormJourney('Ada Lovelace', 'ada@example.com', 'UK');
    await capstone.uploadReceipt('application/pdf', 'receipt.pdf', Buffer.from('%PDF-1.4'));

    const summaryText = await capstone.getSummaryText();
    await expect(summaryText).toContain('Ada Lovelace');
    await expect(summaryText).toContain('UK');
    await expect(summaryText).toContain('receipt.pdf');
  });
});
