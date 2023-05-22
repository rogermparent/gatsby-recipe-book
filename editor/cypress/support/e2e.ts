import "cypress-axe";
import "@testing-library/cypress/add-commands";
import "gatsby-cypress";
import "gatsby-cypress/commands";
import "cypress-plugin-tab";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      tab(): Chainable;
      clearFixture(): Chainable;
      setFixture(value: string): Chainable;
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
  cy.visit("/").waitForRouteChange();
  cy.task("clear");
  cy.request("POST", "/__refresh/gatsby-source-filesystem");
  cy.visit("/").waitForRouteChange();
});

Cypress.Commands.add("setFixture", (fixtureName) => {
  cy.visit("/");
  cy.waitForRouteChange();
  cy.task("setFixture", fixtureName);
  cy.request("POST", "/__refresh/gatsby-source-filesystem");
  cy.visit("/");
  cy.waitForRouteChange();
});
