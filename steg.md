# 1. Git initialisering
```
git init
```

# 2. Opprett .gitignore
Legg inn hva som skal ikke tas med i git. F.eks.
```
# Dependencies
node_modules/

# Playwright
.playwright/
playwright-report/
test-results/
tests/.features-gen/

# Reports
reports/

# Environment
.env
.env.local
```

# Bonus - Git Tree Visualisering

```
git config --global alias.tree "log --oneline --graph --all --decorate"

```

1. Oppretter en alias. 
2. Deretter kan du bare skrive: ```git tree```
3. Resultat: Viser en ASCII-graf av commits med branches.

# 3. Opprett GitHub/GitLab Repository
```
1. Gå til https://github.com
2. Klikk på "+" øverst til høyre → "New repository"
3. Fyll ut:
  Repository name: playwright-bdd (eller ditt valgte navn)
  Description: "Playwright-bdd testrammeverk med norsk Gherkin"
  Public eller Private (ditt valg)
  IKKE huk av "Add README" eller ".gitignore" (vi har allerede disse!)
4. Klikk "Create repository"
```

# 4. Koble lokal repo til GitHub
GitHub viser deg kommandoer etter opprettelse. Kopier URL-en til repoet, deretter kjør:
```
git remote add origin <GITHUB_URL>
git branch -M main
git push -u origin main
```

# 5. Node.js Prosjekt Initialisering
``
npm init -y
``

Oppretter package.json med default verdier.
***-y*** flagget hopper over alle spørsmål og bruker defaults

# 6. Installer Core Dependencies: Playwright-BDD
```
npm install -D playwright-bdd @playwright/test typescript @types/node
```
```
playwright-bdd - BDD-integrasjon for Playwright
@playwright/test - Playwright test runner
typescript - TypeScript kompilator
@types/node - TypeScript type definitions for Node.js
```

# 7. Installer Playwright Browsers
```
npx playwright install
```
Playwright laster ned browser binaries (Chromium, Firefox, WebKit)

# 8. TypeScript Konfigurasjon
Opprett filen `tsconfig.json` i rot-mappen

**Viktige settings:**
- `strict: true` - Full TypeScript strict mode
- `paths` - Alias for imports (@pages, @steps, @fixtures, @utils)
- `include` - Hvilke filer som skal kompileres
- `exclude` - Mapper som skal ignoreres (node_modules, dist, reports, tests)

# 9. Playwright Konfigurasjon med Playwright-BDD
Opprett `playwright.config.ts` i rot-mappen

**Viktige settings:**
- Import `defineBddConfig` fra playwright-bdd
- Konfigurer BDD:
  - `features: 'features/**/*.feature'` - Hvor feature-filer ligger
  - `steps: 'steps/**/*.ts'` - Hvor step definitions ligger
  - `language: 'nb'` - Norsk Bokmål Gherkin
- `testDir` - Bruk output fra defineBddConfig
- `projects` - Kun Chromium
- Reporters - HTML, JSON, list
- Screenshots/video kun ved failure

# 10. Opprett Mappestruktur
```bash
mkdir features
mkdir steps
mkdir pages
mkdir fixtures
mkdir utils
```

**Struktur:**
```
features/   - Feature-filer (.feature)
steps/      - Step definitions (.ts)
pages/      - Page Object Model
fixtures/   - Playwright fixtures
utils/      - Hjelpefunksjoner
```

# 11. Oppdater package.json Scripts ✅
Legg til i package.json under "scripts":
```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report reports/html"
  }
}
```

**Forklaring:**
- `test` - Kjør alle tester
- `test:headed` - Kjør med synlig browser (debugging)
- `test:debug` - Debug mode med Playwright Inspector
- `test:ui` - UI mode for interaktiv testing
- `report` - Vis HTML rapport

**Status:** Scripts lagt til i package.json

# 12. Opprett Første Feature-fil (MVP)
Opprett `features/example.feature`

**Innhold:**
```gherkin
# language: nb
Egenskap: Playwright Hjemmeside

  Scenario: Besøk Playwright hjemmeside
    Gitt at jeg er på Playwright hjemmesiden
    Når jeg ser på sidetittelen
    Så skal tittelen inneholde "Playwright"
```

**Viktig:**
- Første linje må være `# language: nb` for norsk Gherkin
- Bruk norske nøkkelord: Egenskap, Scenario, Gitt, Når, Så

**Merk:** Dette er en enkel tutorial-test for å verifisere at rammeverket fungerer. For reelle prosjekter skal feature-filer følge `gherkin-norsk-kvalitet` skill guidelines med fokus på forretningsverdi og ikke-teknisk språk.

# 13. Opprett Step Definitions
Opprett `steps/example.steps.ts`

**Innhold:**
```typescript
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given('at jeg er på Playwright hjemmesiden', async ({ page }) => {
  await page.goto('https://playwright.dev');
});

When('jeg ser på sidetittelen', async ({ page }) => {
  // Tittel lastes automatisk, ingen action nødvendig
});

Then('skal tittelen inneholde {string}', async ({ page }, forventetTekst: string) => {
  await expect(page).toHaveTitle(new RegExp(forventetTekst, 'i'));
});
```

**Viktig:**
- Import `createBdd` fra playwright-bdd
- Norsk tekst matcher feature-fil eksakt
- `{string}` matcher parameter i Gherkin

# 14. Kjør Første Test
```bash
npm test
```

**Forventet output:**
```
Running 1 test using 1 worker

  ✓  features/example.feature:4:3 › Besøk Playwright hjemmeside (2.3s)

  1 passed (2.3s)
```

# 15. Generer og Sjekk Rapport
```bash
npm run report
```

**Resultat:**
- HTML rapport åpnes i browser
- Viser test status, execution time, screenshots (hvis failure)