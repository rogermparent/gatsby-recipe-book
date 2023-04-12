import "cypress-axe";
import "@testing-library/cypress/add-commands";
import "gatsby-cypress";
import "gatsby-cypress/commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      waitForRouteChange(): Chainable;
      assertRoute(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add(`assertRoute`, (route) => {
  cy.url().should(`equal`, `${window.location.origin}${route}`);
});
