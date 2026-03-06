
// cypress/e2e/account.cy.js
describe('Account API - Create User', () => {
  const mkUser = (suffix = '') =>
    `qa_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${suffix}`;

  it('should create a new user (201) and return userID/username/books', () => {
    const userName = mkUser();
    cy.apiCreateUser({ userName, password: Cypress.env('password') })
      .then((res) => {
        expect(res.status).to.eq(201); // expected by multiple references
        expect(res.body).to.have.keys('userID', 'username', 'books');
        expect(res.body.userID).to.be.a('string');
        expect(res.body.username).to.eq(userName);
        expect(res.body.books).to.be.an('array').that.is.empty;
      });
    });

  it('should fail creating a duplicate user', () => {
    const userName = mkUser('_dup');
    const password = Cypress.env('password');

    cy.apiCreateUser({ userName, password }).its('status').should('eq', 201);
    cy.apiCreateUser({ userName, password }).then((res) => {
      expect(res.status).to.be.within(400, 499);
      expect(res.body).to.have.property('message'); // typical error field
    });
  });

  it('should reject weak password / missing fields', () => {
    const userName = mkUser('_weak');
    cy.apiCreateUser({ userName, password: 'weak' }).then((res) => {
      expect(res.status).to.be.within(400, 499);
    });

    cy.apiCreateUser({ userName: null, password: Cypress.env('password') }).then((res) => {
      expect(res.status).to.be.within(400, 499);
    });
  });

  it('should fail creating a duplicate user', () => {
    const userName = mkUser('_dup');
    const password = Cypress.env('password');

    cy.apiCreateUser({ userName, password }).its('status').should('eq', 201);
    cy.apiCreateUser({ userName, password }).then((res) => {
      expect(res.status).to.be.within(400, 499);
      expect(res.body).to.have.property('message'); // typical error field
    });
  });
});
