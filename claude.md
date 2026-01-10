# Playwright-bdd Testrammeverk med Norsk Gherkin

## Prosjektoversikt

Dette er et testrammeverk bygget fra scratch med Playwright-bdd, TypeScript og norsk Gherkin-syntaks. Prosjektet følger **MVP (Minimum Viable Product)** tankegangen - vi bygger det minimale som fungerer først, og utvider funksjonaliteten gradvis basert på faktiske behov.

## Teknologivalg

- **Playwright-bdd**: BDD-rammeverk for end-to-end testing
- **TypeScript**: Statisk typet JavaScript for bedre kodekvalitet
- **Norsk Gherkin**: Gitt, Når, Så, Men, Og (i18n support)
- **Kjente biblioteker**: Kun etablerte og velprøvde avhengigheter

## Designprinsipper

Prosjektet følger disse etablerte prinsippene:

- **SOLID**: Objektorienterte designprinsipper for vedlikeholdbar kode
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion Principle

- **YAGNI** (You Aren't Gonna Need It): Ikke bygg funksjonalitet før den faktisk trengs

- **DRY** (Don't Repeat Yourself): Unngå duplisering av kode og logikk

- **MVP**: Bygg minimal funksjonalitet først, valider, og utvid deretter

## Prosjektstruktur

```
playwright-bdd/
├── features/           # Gherkin feature-filer (.feature)
├── steps/             # Step definitions (Gitt, Når, Så)
├── pages/             # Page Object Model (POM)
├── fixtures/          # Playwright fixtures og test context
├── utils/             # Hjelpefunksjoner og utilities
├── config/            # Konfigurasjonsfiler
├── reports/           # Test rapporter
└── tests/             # Genererte test-filer (auto-generert av playwright-bdd)
```

## Arbeidsmetode

- **Inkrementell utvikling**: Små, håndterbare steg
- **Ett steg om gangen**: Fullfør og valider før neste steg
- **Test underveis**: Verifiser at alt fungerer før vi går videre
- **Iterativ forbedring**: Refaktorer og forbedre basert på erfaring

## Claude's Rolle

**VIKTIG**: Claude fungerer som en **mentor og guide**, ikke som en executor.

- **Kun guide og veilede**: Claude gir instruksjoner, forklarer konsepter, og svarer på spørsmål
- **Ikke utfør kommandoer**: Claude skal ALDRI kjøre bash-kommandoer, git-kommandoer eller andre operasjoner med mindre brukeren eksplisitt ber om det
- **Brukeren implementerer**: Brukeren er ansvarlig for å kjøre alle kommandoer og implementere alle endringer selv
- **Vente på eksplisitt forespørsel**: Bare når brukeren sier "gjør X" eller "kan du gjøre X", skal Claude utføre handlingen
- **Gi instruksjoner**: I stedet for å gjøre noe, skal Claude si "Kjør denne kommandoen: `git add .`"

## Norsk Gherkin Syntax

Prosjektet bruker norsk Gherkin-nøkkelord:

- **Egenskap**: Feature
- **Regel**: Rule
- **Bakgrunn**: Background
- **Scenario**: Scenario
- **Scenariomal**: Scenario Outline
- **Eksempler**: Examples
- **Gitt**: Given
- **Når**: When
- **Så**: Then
- **Og**: And
- **Men**: But

## WIP Plan - Implementasjonssteg

### Fase 1: Git og Prosjekt Setup
1. **Git initialisering**
   - `git init`
   - Opprett `.gitignore` fil (node_modules, test-results, playwright-report, etc.)

2. **GitHub repository**
   - Opprett remote repository
   - Koble lokal repo til GitHub
   - Initial commit og push

3. **Node.js prosjekt**
   - `npm init -y`

### Fase 2: Installasjon av Dependencies
4. **Installer core dependencies**
   ```bash
   npm install -D playwright-bdd @playwright/test typescript @types/node
   ```

5. **Installer Playwright browsers**
   ```bash
   npx playwright install
   ```
   - Vi installerer kun Chromium (konfigureres senere)

### Fase 3: Konfigurasjon
6. **TypeScript konfigurasjon (`tsconfig.json`)**
   - Kompilator options
   - Path aliases (@pages, @steps, @fixtures, @utils)
   - Include/exclude paths

7. **Playwright konfigurasjon (`playwright.config.ts`)**
   - Kun Chromium i projects array
   - Reporters: HTML, JSON
   - Screenshot og video on failure
   - Base URL og timeout settings

8. **Playwright-bdd konfigurasjon (`bdd.config.ts`)**
   - Features path: `features/**/*.feature`
   - Steps path: `steps/**/*.ts`
   - Language: `'nb'` (norsk bokmål)
   - Output directory for generated tests

### Fase 4: Prosjektstruktur
9. **Opprett mappestruktur**
   ```
   features/
   steps/
   pages/
   fixtures/
   utils/
   ```

10. **Oppdater `package.json` med scripts**
    - `test`: `bddgen && playwright test`
    - `bddgen`: Genererer test-filer
    - `test:headed`: Debug mode
    - `report`: Vis test rapport

### Fase 5: MVP Test (Minimum Viable Product)
11. **Opprett første feature-fil**
    - Enkel scenario med norsk Gherkin (`# language: nb`)
    - F.eks. navigere til en nettside og verifisere tittel

12. **Generer test-filer**
    - Kjør `npx bddgen` for å generere TypeScript test-filer

13. **Opprett step definitions**
    - Implementer Given, When, Then steps
    - Bruk Playwright commands

14. **Opprett første Page Object (kun hvis nødvendig)**
    - Følg YAGNI - ikke lag før det trengs

### Fase 6: Verifisering
15. **Kjør første test**
    - `npm test`
    - Verifiser at testen kjører i Chromium
    - Sjekk at test passerer

16. **Generer og sjekk rapport**
    - `npm run report`
    - HTML rapport

### Fase 7: CI/CD Forberedelse (Senere fase)
17. **GitHub Actions workflow**
    - `.github/workflows/playwright.yml`
    - CI pipeline setup

18. **Test CI/CD pipeline**
    - Push til GitHub
    - Verifiser at tests kjører automatisk

## Status og progresjon

### ✅ Fullført
- Prosjekt initialisering
- Claude.md dokumentasjon opprettet
- Playwright-bdd skill opprettet og oppdatert med korrekt installasjonsinformasjon

### 🔄 Pågående
- Ingen aktive oppgaver

### 📋 Neste steg
- Fase 1: Git og Prosjekt Setup

## Best Practices

- **Page Object Model (POM)**: Separerer UI-logikk fra test-logikk
- **Single Responsibility**: Hver fil/klasse har ett ansvar
- **Gjenbrukbare steg**: Modulære step definitions
- **Type Safety**: Utnytter TypeScript fullt ut
- **Descriptive Naming**: Selvdokumenterende kode
- **Konsistent formatering**: Følg samme kodestil overalt

## Notater

- Dette er et læreprosjekt som følger industry standards
- Fokus på kvalitet over kvantitet
- Dokumentasjon oppdateres kontinuerlig
- Denne filen er en levende dokument som oppdateres underveis

---

*Sist oppdatert: 2026-01-10*
