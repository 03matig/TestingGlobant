const { defineConfig } = require('cypress');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // Habilita el preprocesador de Cucumber (JSON, etc.)
  await addCucumberPreprocessorPlugin(on, {
    ...config,
    stepDefinitions: "cypress/e2e/step_definitions",
  });

  // Hace que .feature y steps .ts/.js se transpilen con esbuild
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
 e2e: {
  specPattern: [
    'cypress/e2e/**/*.cy.{js,ts}',
    'cypress/e2e/**/*.feature'
  ],
   setupNodeEvents,
 },
});

