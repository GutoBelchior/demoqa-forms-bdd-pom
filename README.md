DemoQA Forms — Cypress BDD + POM
Projeto de automação E2E para o Practice Form do https://demoqa.com/, implementado com:

Cypress (15.x)
Cucumber (Gherkin) via @badeball/cypress-cucumber-preprocessor
Page Object Model (POM)
Upload de arquivo (nativo selectFile)
Execução simplificada no Chrome
Pipeline GitHub Actions


Objetivo: preencher o Practice Form com dados aleatórios, fazer upload de um .txt, submeter e validar o modal de confirmação.


Sumário

#arquitetura--stack
#pré-requisitos
#instalação
#estrutura-de-pastas
#convenções-bdd--pom
#comandos-de-execução
#configurações-principais
#execução-por-tags-cucumber
#upload-de-arquivo
#ci--github-actions
#boas-práticas
#troubleshooting
#padrões-de-contribuição
#licença


Arquitetura & Stack

Cypress (test runner)
Cucumber via @badeball/cypress-cucumber-preprocessor (BDD)
Esbuild via @bahmutov/cypress-esbuild-preprocessor (preprocessamento de features/steps)
POM (Page Object Model) para Home, Forms, Practice Form
Upload nativo (selectFile) ou, opcionalmente, cypress-file-upload


Referências oficiais:

Cypress — Docs: https://docs.cypress.io
Badeball Cucumber Preprocessor — Docs: https://github.com/badeball/cypress-cucumber-preprocessor
selectFile (Cypress): https://docs.cypress.io/api/commands/selectfile



Pré-requisitos

Node.js ≥ 18.x (recomendado LTS)
npm ≥ 9.x
Acesso à internet para https://demoqa.com/

Instalação
# instalar dependências
npm i

Estrutura de pastas
.
├─ cypress/
│  ├─ e2e/
│  │  └─ forms/
│  │     ├─ practice-form.feature         # Gherkin (pt)
│  │     └─ practice-form.steps.js        # Step Definitions do cenário acima
│  ├─ fixtures/
│  │  └─ prova-upload.txt                 # Arquivo usado no upload (versionado)
│  ├─ pages/
│  │  ├─ HomePage.js
│  │  ├─ FormsPage.js
│  │  └─ PracticeFormPage.js
│  ├─ support/
│  │  ├─ e2e.js                           # importa commands e plugins
│  │  └─ commands.js                      # Cypress.Commands.add(...)
│  └─ utils/
│     └─ dataFactory.js                   # Geração de dados aleatórios
├─ .github/
│  └─ workflows/
│     └─ cypress.yml                      # Pipeline GitHub Actions (opcional)
├─ .gitignore
├─ cypress.config.js
├─ package.json
└─ README.md

Convenções BDD + POM

Cada .feature deve ter seu arquivo .steps.js com o mesmo prefixo e preferencialmente na mesma pasta.
Os steps importam Page Objects e fábricas de dados.
Page Objects não devem executar cy.* em constructor ou top-level. Usar cy.* apenas dentro de métodos invocados pelos steps.
Steps nunca ficam em cypress/support/e2e.js. O e2e.js deve conter somente imports.


Comandos de execução
Abrir no Chrome (UI gráfica):
