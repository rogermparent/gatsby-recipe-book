/// <reference types="Cypress" />

describe("New Recipe Page", () => {
  it("Should be accessible", () => {
    cy.clearFixture();
    cy.visit("/new-recipe");
    cy.waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Should successfully create a new recipe and redirect to the index page", () => {
    cy.clearFixture();
    cy.visit("/new-recipe");
    cy.waitForRouteChange();

    // Fill out recipe form
    cy.findByLabelText("Slug").type("created-recipe");
    cy.findByLabelText("Name").type("Created Recipe");
    cy.findByText("Create Recipe").click();

    cy.waitForRouteChange();

    // Recipe form should redirect to home
    cy.url().assertRoute("/");
    cy.findByText("Created Recipe");
  });
});
