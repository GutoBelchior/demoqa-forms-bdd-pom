export default class FormsPage {
  goToPracticeForm() {
    cy.contains('.element-list .menu-list li span', 'Practice Form')
      .should('be.visible')
      .click({ force: true });
  }

  goDirectlyToPracticeForm() {
    cy.visit('/automation-practice-form');
  }
}
