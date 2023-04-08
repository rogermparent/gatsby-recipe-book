/// <reference types="Cypress" />

describe("Stateful E2E tests", { testIsolation: false }, () => {
  it("Loads the homepage", () => {
    cy.visit("/").waitForRouteChange();
    cy.request("/CYPRESS_CLEAR_STATE");
    cy.injectAxe();
    cy.checkA11y();
    cy.findByText("There are no recipes");

    // Go to new recipes page
    cy.findByText("New Recipe").click().waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();

    cy.findByLabelText("Slug").type("test-recipe");
    cy.findByLabelText("Name").type("Test Recipe");
    cy.findByText("Create Recipe").click();
    cy.url().should(`equal`, `${window.location.origin}/`);

    cy.findByText("Test Recipe").click().waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();

    cy.findByText("Edit").click().waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();
    cy.findByLabelText("Name").clear().type("Edited Test Recipe");
    cy.get("form").findByText("Edit Recipe").click().waitForRouteChange();

    cy.url().should(`equal`, `${window.location.origin}/recipe/test-recipe`);
    cy.get("body").findByText("Edited Test Recipe");

    cy.findByText("Edit").click().waitForRouteChange();
    cy.findByText("Delete").click().waitForRouteChange();
    cy.url().should(`equal`, `${window.location.origin}/`);

    cy.findByText("There are no recipes");
  });
});
