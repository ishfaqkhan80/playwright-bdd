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

# 3. 
