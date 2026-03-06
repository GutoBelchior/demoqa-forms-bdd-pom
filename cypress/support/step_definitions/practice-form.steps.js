import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/HomePage';
import FormsPage from '../../pages/FormsPage';
import PracticeFormPage from '../../pages/PracticeFormPage';
import { makePracticeFormData } from '../../utils/dataFactory';

const home  = new HomePage();
const forms = new FormsPage();
const form  = new PracticeFormPage();

Given('que acesso o site DemoQA', () => {
  home.visit();
});

When('navego até o card {string}', (cardText) => {
  if (cardText.toLowerCase() === 'forms') {
    home.goToFormsCard();
  } else {
    cy.contains('.card-body', new RegExp(`^${cardText}$`, 'i')).click({ force: true });
  }
});

When('acesso o submenu {string}', (submenu) => {
  if (submenu.toLowerCase() === 'practice form') {
    forms.goToPracticeForm();
  } else {
    cy.contains('.element-list .menu-list li span', new RegExp(submenu, 'i'))
      .click({ force: true });
  }
});

When('preencho todo o formulário com valores aleatórios e faço upload do arquivo', () => {
  const data = makePracticeFormData();
  cy.wrap(data).as('formData');
  form.fillFormWith(data);
});

When('envio o formulário', () => {
  form.submit();
});

Then('devo visualizar o popup de confirmação do envio', () => {
  form.assertModalOpened();
  cy.get('@formData').then((data) => {
    form.assertModalHas({
      firstName: data.firstName,
      lastName:  data.lastName,
      email:     data.email,
      mobile:    data.mobile,
      subject:   data.subject,
      hobby:     data.hobby
    });
  });
});

Then('fecho o popup', () => {
  form.closeModal();
  form.assertModalClosed();
});