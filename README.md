# WebDriverUniversity-WebAutomation

## Project Overview
This repository contains a Playwright automation framework for the AI Playground challenges on WebDriver University. The suite is built with the Page Object Model (POM) and covers nine interactive challenges with meaningful assertions and explicit waits.

## Covered Challenges
1. Dynamic Selectors
2. Flaky Loader
3. Multi-Step Form
4. Race Condition
5. iFrame Login
6. Employee Directory
7. File Upload Validator
8. Priority Board
9. Shop & Checkout Flow (Capstone)

## Prerequisites
- Node.js 18 or later
- npm

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Install the Chromium browser for Playwright:
   ```bash
   npx playwright install chromium
   ```

## Running the Tests
Run the full suite:
```bash
npx playwright test --project=chromium
```

Run in headed mode:
```bash
npx playwright test --project=chromium
```

Open the HTML report:
```bash
npx playwright show-report
```

## Notes on Implementation
- Page locators and actions are encapsulated in page object classes under `tests/pageObjects/`.
- Tests focus on user-facing behavior and value-based assertions rather than simple element existence.
- Explicit waits are used instead of hard-coded sleeps, and the suite is structured to remain independent and repeatable.
..................