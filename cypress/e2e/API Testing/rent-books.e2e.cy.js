
describe('E2E - Create user → Token → Authorized → List → Rent 2 → Verify', () => {
  const userName = `qa_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const password = Cypress.env('password');
  let userId;
  let token;
  let chosenIsbns = [];

  it('step 1: create user (201)', () => {
    cy.apiCreateUser({ userName, password }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body.userID;
      cy.log(`User created: ${userName} (${userId})`);
    });
  });

  it('step 2: generate token (200)', () => {
    cy.apiGenerateToken({ userName, password }).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.token;
      expect(token).to.be.a('string').and.not.empty;
      cy.log(`Token (truncated): ${token.slice(0, 20)}...`);
    });
  });

  it('step 3: confirm authorization (true)', () => {
    cy.apiAuthorized({ userName, password }).then((res) => {
      expect([200, 201]).to.include(res.status);
      expect([true, 'true']).to.include(res.body);
    });
  });

  it('step 4: list books and pick two random ISBNs', () => {
    cy.apiListBooks().then((res) => {
      expect(res.status).to.eq(200);
      const { books } = res.body;
      expect(books.length).to.be.greaterThan(1);

      // Pick 2 distinct random books
      const idxs = new Set();
      while (idxs.size < 2) {
        idxs.add(Math.floor(Math.random() * books.length));
      }
      chosenIsbns = [...idxs].map(i => books[i].isbn);

      cy.log(`Chosen ISBNs: ${chosenIsbns.join(', ')}`);
    });
  });

  it('step 5: rent (add) those two books to user collection', () => {
    cy.apiAddBooks({ token, userId, isbns: chosenIsbns }).then((res) => {
      // Some environments respond 201/200; ensure it’s success
      expect([200, 201]).to.include(res.status);
    });
  });

  it('step 6: get user details and list selected books', () => {
    cy.apiGetUser({ token, userId }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('books').that.is.an('array');

      const userBooks = res.body.books.map(b => b.isbn);
      chosenIsbns.forEach(isbn => expect(userBooks).to.include(isbn));

      // Log user and book details
      cy.log(`User: ${res.body.username} (${res.body.userId})`);
      res.body.books
        .filter(b => chosenIsbns.includes(b.isbn))
        .forEach(b => {
          cy.log(`Book → ISBN: ${b.isbn}; Title: ${b.title}; Author: ${b.author}`);
          // also print to stdout for CI logs
          // eslint-disable-next-line no-console
          console.log(`BOOK: ${b.isbn} | ${b.title} | ${b.author}`);
        });
    });
  });

});
