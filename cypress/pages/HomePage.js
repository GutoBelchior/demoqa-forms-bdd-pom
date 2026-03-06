export default class HomePage {
  visit() {
    cy.visit('/');
  }
  goToFormsCard() {
    cy.contains('.card-body', /^Forms$/).should('be.visible').click({ force: true });
  }
}