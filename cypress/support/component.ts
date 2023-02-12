// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "../../src/main.js";
// Import commands.js using ES2015 syntax:
import "./commands";

import { mount } from "cypress/vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1] & {
  vuetify?: ReturnType<typeof createVuetify>;
};

declare global {
  namespace Cypress {
    interface Chainable {
      mount(component: any, options?: OptionsParam): Chainable<any>;
    }
  }
}

// the Cypress mount function, which wraps the vue-test-utils mount function

Cypress.Commands.add("mount", (component, options = {}) => {
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];

  if (!("vuetify" in options)) {
    // create router if one is not provided
    options.vuetify = createVuetify({
      components,
      directives,
    });
  }

  // Add router plugin
  options.global.plugins.push({
    install(app) {
      if (options.vuetify) {
        app.use(options.vuetify);
      }
    },
  });

  return mount<any>(component, options);
});

// Example use:
// cy.mount(MyComponent)
