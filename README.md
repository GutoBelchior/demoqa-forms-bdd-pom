📘 README – Projeto de Automação DemoQA (Cypress + Cucumber + POM + API E2E)
Este repositório contém a implementação completa de testes de automação utilizando:

Cypress 15+
Cucumber BDD (Badeball Preprocessor)
Page Object Model (POM)
Testes E2E de API (Fluxo contínuo refatorado)
Testes E2E de UI (Practice Form)
Upload de arquivo
Geração dinâmica de dados
Execução simplificada no Chrome
CI/CD opcional via GitHub Actions

O objetivo do desafio é demonstrar capacidade técnica em automação moderna, organização arquitetural, padronização, boas práticas de QA e abrangência de testes.

📂1. Estrutura do Projeto
cypress/
 ├─ e2e/
 │   ├─ api/
 │   │   ├─ bookstore-api.feature       # Feature BDD do fluxo total de API
 │   │   └─ bookstore-api.steps.js      # Steps API (fluxo contínuo refatorado)
 │   └─ forms/
 │       ├─ practice-form.feature       # Feature BDD do formulário
 │       └─ practice-form.steps.js      # Steps UI
 │
 ├─ fixtures/
 │   └─ prova-upload.txt                # Arquivo usado no upload
 │
 ├─ pages/
 │   ├─ HomePage.js
 │   ├─ FormsPage.js
 │   └─ PracticeFormPage.js
 │
 ├─ support/
 │   ├─ commands.js                     # Commands API + Helpers
 │   └─ e2e.js                          # Import de plugins (Cucumber + Upload)
 │
 └─ utils/
     └─ dataFactory.js                  # Geração de dados aleatórios

      2. Testes de API – Fluxo Único e Contínuo (Parte 1 do Desafio)
      A feature bookstore-api.feature executa toda a jornada em uma única execução, incluindo:

Criar usuário
Gerar token
Validar autorização
Listar livros disponíveis
Selecionar 2 livros aleatórios
Adicioná-los à coleção do usuário
Validar que os livros foram adicionados
Imprimir os detalhes no console

📄 Feature (resumo)

Cenário: Criar usuário -> Gerar token -> Autorizar -> Listar -> Adicionar livros -> Validar
  Dado que eu crio um usuário válido para o Book Store
  Quando eu gero o token de acesso para esse usuário
  Então o usuário deve estar autorizado na API
  E eu consulto a lista de livros disponíveis
  Quando eu adiciono dois livros aleatórios à coleção do usuário
  Então devo ver os dois livros na coleção e imprimir seus detalhes

  🧩 Implementação (steps) – fluxo contínuo
Arquivo: cypress/e2e/api/bookstore-api.steps.js

Mantém estado em memória (userId, token, livros, isbns)
Usa apenas Custom Commands Cypress
Usa validações resilientes (200/201, booleano "true"/true)
Realiza logs amigáveis no console

🖥️ 3. Testes de UI – Practice Form (Parte 2 do Desafio)
Implementado com:

Page Objects
Dados dinâmicos aleatórios
Upload de arquivo com selectFile()
Remoção de anúncios flutuantes do DemoQA
Validação do modal de confirmação

Feature:
Cenário: Preencher o formulário com valores aleatórios e enviar

O teste cobre:
✔ First Name
✔ Last Name
✔ Email
✔ Gender
✔ Mobile
✔ Datepicker
✔ Subjects
✔ Hobbies
✔ Upload
✔ Endereço
✔ Estado + Cidade
✔ Submit
✔ Validação do modal
✔ Fechamento do modal

🔧 5. Requisitos

Node.js 18+
npm 9+
Git
Ambiente Windows/Mac/Linux

🌱 6. Especificações Técnicas e Boas Práticas

✔ Arquitetura POM
Cada página encapsula elementos, ações e métodos de verificação.
✔ BDD com Cucumber
Cenários estruturados em .feature utilizando linguagem Gherkin (pt-BR).
✔ Custom Commands
Toda integração com a API ocorre via comandos Cypress (commands.js).
✔ Dados dinâmicos (Factory)
Gerador robusto para nomes, e-mails, telefone, endereços.
✔ Upload de arquivo nativo
Utilizando cy.selectFile, sem dependências externas.
✔ Logs inteligentes

📄 10. Licença
Projeto público para fins técnicos, demonstração e avaliação.
Utilize como referência ou template livremente.
Para debug e rastreabilidade dos fluxos API.
