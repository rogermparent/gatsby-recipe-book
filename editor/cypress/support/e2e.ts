import "cypress-axe";
import "@testing-library/cypress/add-commands";
import "gatsby-cypress";
import "gatsby-cypress/commands";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      waitForRouteChange(): Chainable;
    }
  }
}
