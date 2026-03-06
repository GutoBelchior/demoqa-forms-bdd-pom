// cypress.config.js

const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').default;
const cucumber = require('@badeball/cypress-cucumber-preprocessor');

async function setupNodeEvents(on, config) {
  // registra o plugin Cucumber UMA vez
  await cucumber.addCucumberPreprocessorPlugin(on, config);

  // bundler (esbuild) para compilar features + steps
  on('file:preprocessor', createBundler({
    plugins: [createEsbuildPlugin(config)],
  }));

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',

    // Rode apenas .feature como specs (ou misto, veja comentário abaixo)

    specPattern: [
      'cypress/e2e/**/*.feature',
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
    ],


    // 🔑 Onde o Cucumber deve procurar os .steps.js
    stepDefinitions: [
      'cypress/e2e/**/*.steps.{js,ts}',
      'cypress/support/step_definitions/**/*.{js,ts}',
    ],

    // Evita que o Cypress trate steps como specs
    excludeSpecPattern: ['**/*.steps.*'],

    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,

    defaultCommandTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 800,
    chromeWebSecurity: false,
    video: false,

    env: {
      TAGS: '@smoke or @regression',

      // (se você estiver usando os testes de API também)
      BOOKSTORE_BASE: 'https://demoqa.com',
      ACCOUNT_PREFIX: '/Account/v1',
      BOOKSTORE_PREFIX: '/BookStore/v1',
      password: 'Str0ng@Pass123!',
    },
  },
});

