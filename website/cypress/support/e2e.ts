import "cypress-axe";
import "@testing-library/cypress/add-commands";
import "gatsby-cypress";
import "gatsby-cypress/commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      clearFixture(): Chainable;
      setFixture(value: string): Chainable;
      waitForRouteChange(): Chainable;
      assertRoute(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

beforeEach(() => {
  cy.visit("/");
  cy.waitForRouteChange();
});

Cypress.Commands.add(`assertRoute`, (route) => {
  cy.url().should(`equal`, `${window.location.origin}${route}`);
});

Cypress.Commands.add("clearFixture", () => {
  cy.visit("/");
  cy.waitForRouteChange().task("clear");
  cy.visit("/");
  cy.waitForRouteChange();
});

Cypress.Commands.add("setFixture", (fixtureName) => {
  cy.visit("/");
  cy.waitForRouteChange().task("clear");
  cy.visit("/");
  cy.waitForRouteChange().task("setFixture", fixtureName);
  cy.visit("/");
  cy.waitForRouteChange();
});
