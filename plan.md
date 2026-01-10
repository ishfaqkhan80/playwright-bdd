# Detaljert Implementasjonsplan - Playwright-bdd med Norsk Gherkin

**Prosjekt**: Testrammeverk fra scratch
**Tilnærming**: MVP (Minimum Viable Product)
**Dato opprettet**: 2026-01-10

---

## 🎯 Mål

Bygge et komplett Playwright-bdd testrammeverk med TypeScript og norsk Gherkin-syntaks som følger industry best practices.

---

## 📋 Fase 1: Git og Prosjekt Setup

### Steg 1.1: Git Initialisering
**Hva skal gjøres:**
- Kjør `git init` i prosjektmappen
- Opprett `.gitignore` fil

**`.gitignore` innhold:**
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

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# TypeScript
dist/
*.tsbuildinfo

# Logs
*.log
npm-debug.log*
```

**Suksesskriterier:**
- ✅ Git repository initialisert
- ✅ .gitignore fil opprettet og committed

---

### Steg 1.2: GitHub Repository
**Hva skal gjøres:**
- Opprett nytt repository på GitHub (public eller private)
- Koble lokal repo til remote
- Push initial commit

**Kommandoer:**
```bash
git remote add origin <GITHUB_URL>
git branch -M main
git add .
git commit -m "Initial commit: Project setup with claude.md and plan.md"
git push -u origin main
```

**Suksesskriterier:**
- ✅ GitHub repository opprettet
- ✅ Lokal repo koblet til remote
- ✅ Initial commit pushet

---

### Steg 1.3: Node.js Prosjekt Initialisering
**Hva skal gjøres:**
- Kjør `npm init -y`
- Verifiser at `package.json` er opprettet

**Forventet resultat:**
- `package.json` fil med default verdier

**Suksesskriterier:**
- ✅ package.json opprettet
- ✅ Fil committed til git

---

## 📦 Fase 2: Installasjon av Dependencies

### Steg 2.1: Installer Core Dependencies
**Hva skal gjøres:**
```bash
npm install -D playwright-bdd @playwright/test typescript @types/node
```

**Pakker som installeres:**
- `playwright-bdd` - BDD-integrasjon for Playwright
- `@playwright/test` - Playwright test runner
- `typescript` - TypeScript kompilator
- `@types/node` - Type definitions for Node.js

**Suksesskriterier:**
- ✅ Alle pakker installert i devDependencies
- ✅ package.json oppdatert med versjoner
- ✅ package-lock.json opprettet
- ✅ node_modules/ mappe opprettet (ikke committed)

---

### Steg 2.2: Installer Playwright Browsers
**Hva skal gjøres:**
```bash
npx playwright install
```

**Hva skjer:**
- Playwright laster ned browser binaries (Chromium, Firefox, WebKit)
- Vi konfigurerer senere til kun Chromium

**Suksesskriterier:**
- ✅ Browsers installert uten feil
- ✅ Kan kjøre `npx playwright --version` uten feil

---

## ⚙️ Fase 3: Konfigurasjon

### Steg 3.1: TypeScript Konfigurasjon
**Fil**: `tsconfig.json`

**Innhold:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["pages/*"],
      "@steps/*": ["steps/*"],
      "@fixtures/*": ["fixtures/*"],
      "@utils/*": ["utils/*"]
    },
    "types": ["node", "@playwright/test"]
  },
  "include": [
    "features/**/*",
    "steps/**/*",
    "pages/**/*",
    "fixtures/**/*",
    "utils/**/*",
    "*.config.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "reports",
    "tests"
  ]
}
```

**Forklaring av viktige settings:**
- `strict: true` - Full TypeScript strict mode
- `paths` - Alias for rene imports (@pages istedenfor ../../pages)
- `include` - Hvilke filer som skal kompileres
- `exclude` - Mapper som skal ignoreres

**Suksesskriterier:**
- ✅ tsconfig.json opprettet
- ✅ Ingen syntaksfeil i JSON
- ✅ Fil committed til git

---

### Steg 3.2: Playwright Konfigurasjon
**Fil**: `playwright.config.ts`

**Innhold:**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Timeout settings
  timeout: 30000,
  expect: {
    timeout: 5000
  },

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list']
  ],

  // Global test settings
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  // Projects - KUN Chromium
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

**Forklaring:**
- `testDir` - Hvor genererte test-filer ligger
- `fullyParallel` - Kjør tester parallelt
- `retries` - Retry feilede tester i CI
- `projects` - Kun Chromium som spesifisert
- `reporter` - HTML og JSON rapporter

**Suksesskriterier:**
- ✅ playwright.config.ts opprettet
- ✅ Ingen TypeScript feil
- ✅ Kun Chromium konfigurert
- ✅ Fil committed til git

---

### Steg 3.3: Playwright-bdd Konfigurasjon
**Fil**: `bdd.config.ts`

**Innhold:**
```typescript
import { defineBddConfig } from 'playwright-bdd';

export default defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.ts',

  // Norsk Gherkin
  language: 'nb',

  // Output directory for generated tests
  outputDir: 'tests/.features-gen',

  // Cucumber options
  importTestFrom: 'fixtures/test-context.ts',
});
```

**Forklaring:**
- `features` - Hvor feature-filer ligger
- `steps` - Hvor step definitions ligger
- `language: 'nb'` - Norsk Bokmål Gherkin
- `outputDir` - Hvor genererte test-filer plasseres
- `importTestFrom` - Custom fixtures (opprettes senere)

**Suksesskriterier:**
- ✅ bdd.config.ts opprettet
- ✅ Norsk språk konfigurert
- ✅ Paths korrekt satt
- ✅ Fil committed til git

---

## 📁 Fase 4: Prosjektstruktur

### Steg 4.1: Opprett Mappestruktur
**Mapper som skal opprettes:**
```bash
mkdir features
mkdir steps
mkdir pages
mkdir fixtures
mkdir utils
mkdir reports
```

**Struktur:**
```
playwright-bdd/
├── .claude/
│   └── skills/
├── features/           # ← Ny
├── steps/              # ← Ny
├── pages/              # ← Ny
├── fixtures/           # ← Ny
├── utils/              # ← Ny
├── reports/            # ← Ny (gitignored)
├── tests/              # ← Genereres av bddgen
├── .gitignore
├── bdd.config.ts
├── claude.md
├── package.json
├── plan.md
├── playwright.config.ts
└── tsconfig.json
```

**Suksesskriterier:**
- ✅ Alle mapper opprettet
- ✅ Mappestruktur matcher planen
- ✅ Endringer committed til git

---

### Steg 4.2: Oppdater package.json Scripts
**Hva skal gjøres:**
Legg til scripts-seksjonen i `package.json`

**Scripts å legge til:**
```json
{
  "scripts": {
    "test": "bddgen && playwright test",
    "test:headed": "bddgen && playwright test --headed",
    "test:debug": "bddgen && playwright test --debug",
    "test:ui": "bddgen && playwright test --ui",
    "bddgen": "bddgen",
    "report": "playwright show-report reports/html"
  }
}
```

**Forklaring:**
- `test` - Generer tests og kjør dem
- `test:headed` - Kjør med synlig browser
- `test:debug` - Debug mode med Playwright Inspector
- `test:ui` - UI mode for interaktiv testing
- `bddgen` - Kun generer test-filer
- `report` - Vis HTML rapport

**Suksesskriterier:**
- ✅ Scripts lagt til i package.json
- ✅ Ingen syntaksfeil i JSON
- ✅ Fil committed til git

---

## 🧪 Fase 5: MVP Test (Minimum Viable Product)

### Steg 5.1: Opprett Første Feature-fil
**Fil**: `features/example.feature`

**Innhold:**
```gherkin
# language: nb
Funksjonalitet: Playwright Hjemmeside

  Scenario: Besøk Playwright hjemmeside
    Gitt at jeg er på Playwright hjemmesiden
    Når jeg ser på sidetittelen
    Så skal tittelen inneholde "Playwright"
```

**Forklaring:**
- `# language: nb` - Aktiverer norsk Gherkin
- Enkel scenario for å verifisere at alt fungerer
- Bruker offentlig nettside (playwright.dev)

**Suksesskriterier:**
- ✅ Feature-fil opprettet
- ✅ Norsk Gherkin syntaks korrekt
- ✅ Fil committed til git

---

### Steg 5.2: Generer Test-filer
**Hva skal gjøres:**
```bash
npm run bddgen
```

**Forventet resultat:**
- Test-filer genereres i `tests/.features-gen/`
- Ingen feil i output
- Ser hvilke steps som mangler implementasjon

**Suksesskriterier:**
- ✅ Kommando kjører uten feil
- ✅ Test-filer generert
- ✅ Output viser manglende steps

---

### Steg 5.3: Opprett Step Definitions
**Fil**: `steps/example.steps.ts`

**Innhold:**
```typescript
import { Given, When, Then } from 'playwright-bdd/decorators';
import { expect } from '@playwright/test';

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

**Forklaring:**
- Import fra `playwright-bdd/decorators`
- Bruk `{ page }` fixture fra Playwright
- Norsk tekst matcher feature-fil eksakt
- `{string}` matcher parameter i Gherkin

**Suksesskriterier:**
- ✅ Step definitions opprettet
- ✅ Ingen TypeScript feil
- ✅ Steps matcher feature-fil
- ✅ Fil committed til git

---

### Steg 5.4: (Valgfritt) Opprett Page Object
**OBS**: Følger YAGNI - kun hvis det gir verdi!

For denne enkle testen er Page Object **IKKE** nødvendig.

**Hvis det blir nødvendig senere:**
```typescript
// pages/PlaywrightHomePage.ts
import { Page } from '@playwright/test';

export class PlaywrightHomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://playwright.dev');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
```

**Suksesskriterier:**
- ✅ Vurdering gjort: trengs Page Object? (Nei for MVP)

---

## ✅ Fase 6: Verifisering

### Steg 6.1: Kjør Første Test
**Hva skal gjøres:**
```bash
npm test
```

**Forventet output:**
```
Running 1 test using 1 worker

  ✓  features/example.feature:4:3 › Besøk Playwright hjemmeside (2.3s)

  1 passed (2.3s)
```

**Troubleshooting:**
- Hvis test feiler: Sjekk nettverkstilkobling
- Hvis imports feiler: Sjekk tsconfig.json paths
- Hvis steps ikke matches: Sjekk at tekst er identisk

**Suksesskriterier:**
- ✅ Test kjører i Chromium
- ✅ Test passerer (grønn)
- ✅ Ingen errors eller warnings
- ✅ Screenshot/video kun ved failure

---

### Steg 6.2: Generer og Sjekk Rapport
**Hva skal gjøres:**
```bash
npm run report
```

**Forventet resultat:**
- HTML rapport åpnes i browser
- Viser 1 passed test
- Kan se test details og timeline

**Rapport innhold:**
- Test status (passed/failed)
- Execution time
- Screenshots (hvis failure)
- Trace (hvis failure)

**Suksesskriterier:**
- ✅ HTML rapport generert
- ✅ Rapport viser korrekt status
- ✅ Kan navigere i rapporten

---

## 🚀 Fase 7: CI/CD Forberedelse (Senere Fase)

### Steg 7.1: GitHub Actions Workflow
**Fil**: `.github/workflows/playwright.yml`

**Innhold (kommer senere):**
```yaml
name: Playwright Tests
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps chromium
    - name: Run tests
      run: npm test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: reports/
```

**Suksesskriterier:**
- ✅ Workflow-fil opprettet
- ✅ Kun Chromium installeres
- ✅ Rapporter lastes opp som artifacts

---

### Steg 7.2: Test CI/CD Pipeline
**Hva skal gjøres:**
- Push endringer til GitHub
- Gå til Actions tab
- Verifiser at workflow kjører

**Suksesskriterier:**
- ✅ Workflow starter automatisk
- ✅ Tests kjører i CI
- ✅ Grønn checkmark ved success
- ✅ Artifacts tilgjengelig for nedlasting

---

## 📊 Progresjon Tracking

### ✅ Fullført
- [x] Claude.md opprettet
- [x] Plan.md opprettet
- [x] Playwright-bdd skill opprettet

### 🔄 Pågående
- [ ] Ingen

### 📋 Kommende
- [ ] Fase 1: Git og Prosjekt Setup
- [ ] Fase 2: Installasjon
- [ ] Fase 3: Konfigurasjon
- [ ] Fase 4: Prosjektstruktur
- [ ] Fase 5: MVP Test
- [ ] Fase 6: Verifisering
- [ ] Fase 7: CI/CD (senere)

---

## 🎓 Læringsmål

Ved slutten av dette prosjektet skal du kunne:
- ✅ Sette opp Playwright-bdd prosjekt fra scratch
- ✅ Skrive feature-filer med norsk Gherkin
- ✅ Implementere step definitions med TypeScript
- ✅ Konfigurere Playwright for spesifikke browsers
- ✅ Kjøre og debugge BDD-tester
- ✅ Generere og tolke test-rapporter
- ✅ Følge best practices (SOLID, YAGNI, DRY, MVP)
- ✅ Sette opp CI/CD pipeline for automatisk testing

---

## 📝 Notater og Beslutninger

### Beslutning 1: Kun Chromium
**Grunn**: Enklere setup og raskere test-kjøring for MVP. Andre browsers kan legges til senere.

### Beslutning 2: Norsk Gherkin
**Grunn**: Bedre forståelse for norske stakeholders. Business language på norsk.

### Beslutning 3: MVP-først tilnærming
**Grunn**: Få noe fungerende raskt, lær underveis, utvid basert på behov.

### Beslutning 4: Page Objects kun ved behov
**Grunn**: Følger YAGNI - ikke lag abstractions før de trengs.

---

**Sist oppdatert**: 2026-01-10
