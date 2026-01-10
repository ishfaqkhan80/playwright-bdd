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
