import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Playwright-BDD konfigurasjon
const testDir = defineBddConfig({
  features: 'features/**/*.feature', // Hvor feature-filer ligger
  steps: 'steps/**/*.ts', // Hvor step definitions ligger
  language: 'nb', // Norsk Bokmål Gherkin
});

/**
 * Playwright konfigurasjon for BDD-testing med norsk Gherkin
 * Kun Chromium-testing, optimalisert for både lokal utvikling og CI/CD
 */
export default defineConfig({
  // Mappe hvor genererte test-filer fra playwright-bdd ligger
  testDir,

  // Timeouts
  timeout: 30000, // Maks 30s per test
  expect: {
    timeout: 5000 // Maks 5s for assertions (await expect...)
  },

  // Kjøring
  fullyParallel: true, // Kjør alle tester parallelt (raskere)
  forbidOnly: !!process.env.CI, // Blokker test.only() i CI
  retries: process.env.CI ? 2 : 0, // Retry ved failure i CI, ingen retry lokalt
  workers: process.env.CI ? 1 : undefined, // 1 worker i CI, auto lokalt

  // Rapportering
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }], // Visuell HTML-rapport
    ['json', { outputFile: 'reports/results.json' }], // Maskinlesbar JSON
    ['list'] // Terminal output med live progress
  ],

  // Browser innstillinger
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // Standard URL
    trace: 'on-first-retry', // Detaljert trace kun ved første retry
    screenshot: 'only-on-failure', // Screenshot kun ved failure
    video: 'retain-on-failure', // Video kun ved failure
    actionTimeout: 10000, // Maks 10s for actions (click, fill, etc.)
  },

  // Projects - KUN Chromium som spesifisert
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, // Realistisk Chrome viewport og user-agent
    },
  ],
});
