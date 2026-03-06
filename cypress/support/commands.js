import 'cypress-file-upload';

Cypress.Commands.add('hideDemoqaAds', () => {
  cy.window({ log: false }).then((win) => {
    const style = win.document.createElement('style');
    style.innerHTML = `
      #fixedban, .Advertisement-Section, .adsbygoogle, iframe,
      .category-cards .card.mt-4.top-card { display: none !important; visibility: hidden !important; }
      footer { display: none !important; }
    `;
    win.document.head.appendChild(style);
  });
});

Cypress.Commands.add('apiCreateUser', ({ userName, password }) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('ACCOUNT_PREFIX')}/User`,
    baseUrl: Cypress.env('BOOKSTORE_BASE'),
    headers: { 'Content-Type': 'application/json' },
    body: { userName, password },
    failOnStatusCode: false // let spec assert details
  });
});

Cypress.Commands.add('apiGenerateToken', ({ userName, password }) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('ACCOUNT_PREFIX')}/GenerateToken`,
    baseUrl: Cypress.env('BOOKSTORE_BASE'),
    headers: { 'Content-Type': 'application/json' },
    body: { userName, password },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiAuthorized', ({ userName, password }) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('ACCOUNT_PREFIX')}/Authorized`,
    baseUrl: Cypress.env('BOOKSTORE_BASE'),
    headers: { 'Content-Type': 'application/json' },
    body: { userName, password },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiListBooks', () => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('BOOKSTORE_PREFIX')}/Books`,
    baseUrl: Cypress.env('BOOKSTORE_BASE'),
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiAddBooks', ({ token, userId, isbns }) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('BOOKSTORE_PREFIX')}/Books`,
    baseUrl: Cypress.env('BOOKSTORE_BASE'),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: {
      userId,
      collectionOfIsbns: isbns.map(isbn => ({ isbn }))
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiGetUser', ({ token, userId }) => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('ACCOUNT_PREFIX')}/User/${userId}`,
    baseUrl: Cypress.env('BOOKSTORE_BASE'),
    headers: {
      'Authorization': `Bearer ${token}`
    },
    failOnStatusCode: false
  });
});
