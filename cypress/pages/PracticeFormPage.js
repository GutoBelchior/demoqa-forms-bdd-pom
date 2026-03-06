
export default class PracticeFormPage {
  elements = {
    firstName:  () => cy.get('#firstName'),
    lastName:   () => cy.get('#lastName'),
    email:      () => cy.get('#userEmail'),
    mobile:     () => cy.get('#userNumber'),
    dobInput:   () => cy.get('#dateOfBirthInput'),
    subjects:   () => cy.get('#subjectsInput'),
    upload:     () => cy.get('#uploadPicture'),
    address:    () => cy.get('#currentAddress'),
    stateInput: () => cy.get('#react-select-3-input'),
    cityInput:  () => cy.get('#react-select-4-input'),
    submitBtn:  () => cy.get('#submit'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    modalTable: () => cy.get('.table-responsive'),
    modalClose: () => cy.get('#closeLargeModal')
  };
// cypress/pages/PracticeFormPage.js
uploadPicture(fileName) {
  // Usa caminho absoluto relativo ao projeto
  this.elements
    .upload()
    .selectFile(`cypress/fixtures/${fileName}`, { force: true });
}
  preparePage() { cy.hideDemoqaAds(); }

  fillFirstName(v) { this.elements.firstName().clear().type(v); }
  fillLastName(v)  { this.elements.lastName().clear().type(v); }
  fillEmail(v)     { this.elements.email().clear().type(v); }
  fillMobile(v)    { this.elements.mobile().clear().type(v); }
  fillAddress(v)   { this.elements.address().clear().type(v); }

  selectGender(labelText) {
    const map = { Male: 'gender-radio-1', Female: 'gender-radio-2', Other: 'gender-radio-3' };
    const id = map[labelText] ?? map.Male;
    cy.get(`label[for="${id}"]`).click({ force: true });
  }

  pickDateOfBirth({ month = 'January', year = '1995', day = '015' } = {}) {
    this.elements.dobInput().click();
    cy.get('.react-datepicker__month-select').select(month);
    cy.get('.react-datepicker__year-select').select(year);
    cy.get(`.react-datepicker__day--${day}:not(.react-datepicker__day--outside-month)`)
      .click({ force: true });
  }

  addSubject(subject) { this.elements.subjects().type(subject).type('{enter}'); }

  checkHobby(labelText) {
    const map = { Sports: 'hobbies-checkbox-1', Reading: 'hobbies-checkbox-2', Music: 'hobbies-checkbox-3' };
    const id = map[labelText] ?? map.Sports;
    cy.get(`label[for="${id}"]`).click({ force: true });
  }

  uploadPicture(fileName) { this.elements.upload().attachFile(fileName); }
  selectState(txt) { this.elements.stateInput().type(`${txt}{enter}`); }
  selectCity(txt)  { this.elements.cityInput().type(`${txt}{enter}`); }

  submit() { this.elements.submitBtn().scrollIntoView().click({ force: true }); }

  assertModalOpened() {
    this.elements.modalTitle()
      .should('be.visible')
      .and('contain.text','Thanks for submitting the form');
  }

  assertModalHas(o = {}) {
    const { firstName, lastName, email, mobile, subject, hobby } = o;
    this.elements.modalTable().within(() => {
      if (firstName) cy.contains('td', firstName).should('exist');
      if (lastName)  cy.contains('td', lastName).should('exist');
      if (email)     cy.contains('td', email).should('exist');
      if (mobile)    cy.contains('td', mobile).should('exist');
      if (subject)   cy.contains('td', subject).should('exist');
      if (hobby)     cy.contains('td', hobby).should('exist');
    });
  }

  closeModal()        { this.elements.modalClose().click({ force: true }); }
  assertModalClosed() { cy.get('.modal-content').should('not.exist'); }

  fillFormWith({
    firstName, lastName, email, gender,
    mobile, dob, subject, hobby, pictureFile,
    address, state, city
  }) {
    this.preparePage();
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillEmail(email);
    this.selectGender(gender);
    this.fillMobile(mobile);
    this.pickDateOfBirth(dob);
    this.addSubject(subject);
    this.checkHobby(hobby);
    this.uploadPicture(pictureFile);
    this.fillAddress(address);
    this.selectState(state);
    this.selectCity(city);
  }
}
