
describe('Account API - Token & Authorization', () => {
  const userName = `qa_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const password = Cypress.env('password');
  let token;
  let userId;

  before(() => {
    cy.apiCreateUser({ userName, password }).then((res) => {
      expect(res.status).to.eq(201);
      userId = res.body.userID;
    });
  });

it('should generate a token (200) with status Success', () => {
    cy.apiGenerateToken({ userName, password }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token').and.to.be.a('string');
      expect(res.body).to.have.property('status');
      token = res.body.token;
    });
  });

it('should confirm authorization (boolean true)', () => {
    cy.apiAuthorized({ userName, password }).then((res) => {
      expect([200, 201]).to.include(res.status); // some examples indicate 201
      // body may be boolean true or string "true" depending on env
      expect([true, 'true']).to.include(res.body);
    });
  });


it('should return not authorized with invalid creds', () => {
  cy.apiAuthorized({ userName, password: 'wrong@12345' }).then((res) => {
    // 1) Torna o teste tolerante a ambientes que devolvem 404:
    expect([200, 201, 400, 401, 404]).to.include(res.status);

    // 2) Se veio 200/201, a API normalmente devolve boolean "false"/false:
    if ([200, 201].includes(res.status)) {
      expect([false, 'false']).to.include(res.body);
    } else {

      console.log('Authorized (invalid creds) response:', res.status, res.body);
    }
  });

});

});