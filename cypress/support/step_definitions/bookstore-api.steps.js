import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

// ---------- Estado do cenário (mantido em memória durante a execução) ----------
let user = { userName: '', userId: '' };
let token = '';
let books = [];
let chosenIsbns = [];

// Gerador simples e robusto para userName
const mkUser = (suffix = '') =>
  `qa_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${suffix}`;

// ---------- Steps ----------

Given('que eu crio um usuário válido para o Book Store', () => {
  user.userName = mkUser();
  const password = Cypress.env('password') || 'Str0ng@Pass123!';

  return cy.apiCreateUser({ userName: user.userName, password }).then((res) => {
    expect(res.status, 'status de criação de usuário').to.eq(201);
    expect(res.body).to.have.keys('userID', 'username', 'books');
    user.userId = res.body.userID;
    expect(user.userId).to.be.a('string').and.not.empty;

    // Log controlado
    // eslint-disable-next-line no-console
    console.log('[API] Usuário criado:', { userId: user.userId, userName: user.userName });
  });
});

When('eu gero o token de acesso para esse usuário', () => {
  const password = Cypress.env('password') || 'Str0ng@Pass123!';
  return cy.apiGenerateToken({ userName: user.userName, password }).then((res) => {
    expect(res.status, 'status de geração de token').to.eq(200);
    expect(res.body).to.have.property('token');
    token = res.body.token;
    expect(token).to.be.a('string').and.not.empty;

    // eslint-disable-next-line no-console
    console.log('[API] Token (prefixo):', token.slice(0, 20), '...');
  });
});

Then('o usuário deve estar autorizado na API', () => {
  const password = Cypress.env('password') || 'Str0ng@Pass123!';
  return cy.apiAuthorized({ userName: user.userName, password }).then((res) => {
    // Aceita 200 ou 201 conforme ambiente; corpo boolean true (ou "true")
    expect([200, 201]).to.include(res.status);
    expect([true, 'true']).to.include(res.body);
  });
});

Then('eu consulto a lista de livros disponíveis', () => {
  return cy.apiListBooks().then((res) => {
    expect(res.status, 'status listagem de livros').to.eq(200);
    expect(res.body).to.have.property('books').that.is.an('array').and.is.not.empty;
    books = res.body.books;

    // eslint-disable-next-line no-console
    console.log('[API] Quantidade de livros disponíveis:', books.length);
  });
});

When('eu adiciono dois livros aleatórios à coleção do usuário', () => {
  // escolhe 2 índices distintos
  const idxs = new Set();
  while (idxs.size < 2) idxs.add(Math.floor(Math.random() * books.length));
  chosenIsbns = [...idxs].map((i) => books[i].isbn);

  // eslint-disable-next-line no-console
  console.log('[API] ISBNs escolhidos:', chosenIsbns);

  return cy.apiAddBooks({ token, userId: user.userId, isbns: chosenIsbns }).then((res) => {
    expect([200, 201]).to.include(res.status);
  });
});

Then('devo ver os dois livros na coleção do usuário e imprimir seus detalhes', () => {
  return cy.apiGetUser({ token, userId: user.userId }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('books').that.is.an('array');

    const userIsbns = res.body.books.map((b) => b.isbn);
    chosenIsbns.forEach((isbn) => expect(userIsbns).to.include(isbn));

    // Log detalhado dos dois livros
    res.body.books
      .filter((b) => chosenIsbns.includes(b.isbn))
      .forEach((b) => {
        // eslint-disable-next-line no-console
        console.log(`[API] Livro → ISBN: ${b.isbn} | Título: ${b.title} | Autor: ${b.author}`);
      });
  });
});