---
name: playwright-bdd-norsk
description: Playwright-BDD med norsk Gherkin - installasjon, setup, best practices og eksempler
---

# Playwright-BDD med Norsk Gherkin

Komplett guide for Playwright-BDD prosjekter med norsk Gherkin-syntaks.

**Offisiell dokumentasjon**: https://vitalets.github.io/playwright-bdd/

## Installasjon

### Steg 1: Initialiser prosjekt
```bash
npm init -y
```

### Steg 2: Installer dependencies
```bash
npm install -D playwright-bdd @playwright/test typescript @types/node
```

### Steg 3: Installer browsers
```bash
npx playwright install
```

**Viktig**: playwright-bdd krever en installasjon av Playwright (@playwright/test) først. Pakken støtter alle ikke-deprecated versjoner av Playwright.

### Eksempel på komplett devDependencies

Basert på offisiell eksempel-repo (https://github.com/vitalets/playwright-bdd-example):

```json
{
  "devDependencies": {
    "@playwright/test": "^1.56.1",
    "@types/node": "^20.9.4",
    "playwright-bdd": "^8.4.2",
    "typescript": "^5.9.3"
  }
}
```

### Valgfrie tillegg for bedre utvikleropplevelse:
```bash
npm install -D prettier prettier-plugin-gherkin nodemon npm-run-all
```

- `prettier` + `prettier-plugin-gherkin`: Formatering av Gherkin-filer
- `nodemon`: File watcher for utvikling
- `npm-run-all`: Kjør flere scripts parallelt

## Norske Gherkin Nøkkelord

Alle feature-filer skal starte med `# language: nb` for norsk Gherkin-støtte.

### Nøkkelord mapping:
- **Egenskap** / Feature
- **Regel** / Rule
- **Bakgrunn** / Background
- **Scenario** / Scenario
- **Scenario Mal** / Scenario Outline / Scenario Template
- **Eksempler** / Examples / Scenarios
- **Gitt** / Given
- **Når** / When
- **Så** / Then
- **Og** / And
- **Men** / But
- ***** / * (wildcard)
- **@tag** / Tags

## Prosjektstruktur

```
playwright-bdd/
├── features/              # Feature-filer (.feature)
│   ├── innlogging.feature
│   └── dashboard.feature
├── steps/                 # Step definitions (.ts)
│   ├── innlogging.steps.ts
│   └── felles.steps.ts
├── pages/                 # Page Objects (.ts)
│   ├── LoginPage.ts
│   └── DashboardPage.ts
├── bdd.config.ts         # BDD konfigurasjon
├── playwright.config.ts  # Playwright konfigurasjon
└── tsconfig.json         # TypeScript konfigurasjon
```

## BDD Konfigurasjon (bdd.config.ts)

```typescript
import { defineBddConfig } from 'playwright-bdd';

export default defineBddConfig({
  features: ['features/**/*.feature'],
  steps: ['steps/**/*.ts'],
  language: 'nb'  // Norsk Bokmål
});
```

## CLI Kommandoer

```bash
# Generer test-filer fra features
npx bddgen

# Kjør tester
npx playwright test

# Kombiner begge
npx bddgen && npx playwright test
```

## Feature-fil Eksempel 1: Vellykket innlogging

```gherkin
# language: nb
Egenskap: Innlogging

  Bakgrunn:
    Gitt at bruker er på innloggingsside

  Scenario: Vellykket innlogging
    Gitt brukeren har en gyldig konto
    Når brukeren logger inn
    Så skal brukeren se dashboardet
    Og velkomstmelding vises
```

### Tilhørende Step Definitions:

```typescript
import { Gitt, Når, Så, Og } from 'playwright-bdd';
import { expect } from '@playwright/test';

Gitt('brukeren er på innloggingsside', async ({ page }) => {
  await page.goto('/login');
});

Gitt('brukeren har en gyldig konto', async ({}) => {
  // Setup testkonto hvis nødvendig
});

Når('brukeren logger inn', async ({ loginPage }) => {
  await loginPage.loginSomGyldigBruker();
});

Så('skal brukeren se dashboardet', async ({ page }) => {
  await expect(page).toHaveURL(/dashboard/);
});

Og('velkomstmelding vises', async ({ page }) => {
  await expect(page.getByTestId('welcome-message')).toBeVisible();
});
```

## Feature-fil Eksempel 2: Scenario Mal (Data-drevet)

```gherkin
# language: nb
Egenskap: Feil innlogging

  Scenario Mal: Feil innlogging
    Gitt brukeren er på innloggingsside
    Når brukeren prøver å logge inn med <brukernavn> og <passord>
    Så skal feilmelding <melding> vises

    Eksempler:
      | brukernavn | passord | melding              |
      | tom        | riktig  | "Fyll ut brukernavn" |
      | riktig     | tom     | "Fyll ut passord"    |
```

### Tilhørende Step Definitions:

```typescript
import { Gitt, Når, Så } from 'playwright-bdd';
import { expect } from '@playwright/test';

Gitt('brukeren er på innloggingsside', async ({ page }) => {
  await page.goto('/login');
});

Når('brukeren prøver å logge inn med {string} og {string}',
  async ({ loginPage }, brukernavn: string, passord: string) => {
    await loginPage.login(brukernavn, passord);
  }
);

Så('skal feilmelding {string} vises', async ({ page }, melding: string) => {
  await expect(page.getByTestId('error-message')).toHaveText(melding);
});
```

## Feature-fil Eksempel 3: Med Bakgrunn

```gherkin
# language: nb
Egenskap: Innlogging med bakgrunn

  Bakgrunn:
    Gitt at brukeren starter på forsiden

  Scenario: Navigering til innlogging
    Når brukeren klikker på innloggingsknappen
    Så skal innloggingssiden vises
```

### Tilhørende Step Definitions:

```typescript
import { Gitt, Når, Så } from 'playwright-bdd';
import { expect } from '@playwright/test';

Gitt('at brukeren starter på forsiden', async ({ page }) => {
  await page.goto('/');
});

Når('brukeren klikker på innloggingsknappen', async ({ page }) => {
  await page.getByTestId('login-button').click();
});

Så('skal innloggingssiden vises', async ({ page }) => {
  await expect(page).toHaveURL('/login');
});
```

## Page Object Eksempel

```typescript
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async loginSomGyldigBruker() {
    await this.page.getByTestId('username').fill('bruker');
    await this.page.getByTestId('password').fill('passord');
    await this.page.getByTestId('login-submit').click();
  }

  async login(brukernavn: string, passord: string) {
    await this.page.getByTestId('username').fill(brukernavn);
    await this.page.getByTestId('password').fill(passord);
    await this.page.getByTestId('login-submit').click();
  }
}
```

## Best Practices

1. **Hold feature-filer rene**: Feature-filer skal være på forretningsspråk, IKKE tekniske UI-detaljer
   - ✅ GOD: "Når brukeren logger inn"
   - ❌ DÅRLIG: "Når brukeren fyller ut #username-field med 'test@example.com'"

2. **Gjenbruk steps**: Bygg bibliotek av gjenbrukbare steg før du oppretter nye

3. **Bruk tags**: Tag scenarioer for filtrering
   ```gherkin
   @smoke @critical
   Scenario: Vellykket innlogging
   ```

4. **Page Objects for UI-logikk**: All UI-interaksjon skal være i Page Objects, ikke i step definitions

5. **Dokumenter med kommentarer**: Bruk `#` for forklaringer i feature-filer
   ```gherkin
   # Dette scenarioet tester happy path for innlogging
   Scenario: Vellykket innlogging
   ```

6. **Scenario Mal for data-drevet testing**: Bruk "Scenario Mal" og "Eksempler" for å teste flere datasett

7. **Fixtures for gjenbruk**: Bruk Playwright fixtures for Page Objects og test context

## Prinsipper

- **YAGNI**: Ikke bygg funksjonalitet før den trengs
- **DRY**: Unngå duplisering i steps og Page Objects
- **SOLID**: Følg objektorienterte designprinsipper
- **MVP**: Bygg minimalt først, utvid basert på behov

## Begrensninger

- Kun for Playwright-BDD (ikke Cucumber.js eller Cypress)
- Feature-filer må være på norsk Gherkin (`# language: nb`)
- Hold feature-filer på forretningsspråk, ikke tekniske detaljer

## Package.json Scripts

Basert på offisiell eksempel-repo:

```json
{
  "scripts": {
    "test": "bddgen && playwright test",
    "bddgen": "bddgen",
    "test:headed": "bddgen && playwright test --headed",
    "test:debug": "bddgen && playwright test --debug",
    "test:ui": "bddgen && playwright test --ui",
    "report": "playwright show-report",
    "watch:bdd": "nodemon --watch features --exec bddgen",
    "watch:pw": "playwright test --ui",
    "watch": "npm-run-all --parallel watch:*"
  }
}
```

### Forklaring av scripts:
- `test`: Genererer test-filer og kjører alle tester
- `bddgen`: Genererer test-filer fra feature-filer
- `test:headed`: Kjører tester med synlig browser (debugging)
- `test:debug`: Kjører tester i debug-modus
- `test:ui`: Kjører tester med Playwright UI mode
- `report`: Viser HTML test-rapport
- `watch:bdd`: Overvåker feature-filer og regenererer automatisk
- `watch:pw`: Starter Playwright UI i watch mode
- `watch`: Kjører alle watch-scripts parallelt (krever `npm-run-all`)

## Workflow

1. Skriv feature-fil (`.feature`) med norsk Gherkin
2. Kjør `npx bddgen` for å generere test-filer
3. Skriv step definitions (`.steps.ts`)
4. Opprett Page Objects om nødvendig
5. Kjør `npx playwright test`
6. Se rapport med `npx playwright show-report`

---

**Merk**: Referer alltid til https://vitalets.github.io/playwright-bdd/ for oppdatert dokumentasjon og eksempler.
