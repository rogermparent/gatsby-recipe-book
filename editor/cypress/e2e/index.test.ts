/// <reference types="Cypress" />

describe("Homepage", () => {
  it("Should be accessible with no items", () => {
    cy.task("clear");
    cy.visit("/");
    cy.waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Should be accessible with items", () => {
    cy.task("setFixture", "populated");
    cy.visit("/");
    cy.waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Can go to the recipe creation page", () => {
    cy.task("clear");
    cy.visit("/");
    cy.waitForRouteChange();
    cy.findByText("New Recipe").click();
    cy.waitForRouteChange();
    cy.findByText("New Recipe");
    cy.assertRoute("/new-recipe");
  });
});

describe("Rest", () => {
  /*
    // Fill out recipe form
    cy.findByLabelText("Slug").type("test-recipe");
    cy.findByLabelText("Name").type("Test Recipe");
    cy.findByText("Create Recipe").click();

    // Recipe form should redirect to home
    cy.url().assertRoute("/");

    // Go to the newly created recipe page and check its a11y
    cy.findByText("Test Recipe").click().waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();

    // Go to the edit page and check a11y
    cy.findByText("Edit").click().waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();

    // Fill out and submit edit form
    cy.findByLabelText("Name").clear().type("Edited Test Recipe");
    cy.get("form").findByText("Edit Recipe").click().waitForRouteChange();

    // Edit form submission should redirect to recipe page
    cy.url().assertRoute("/recipe/test-recipe");
    cy.get("body").findByText("Edited Test Recipe");

    // Go back to edit page and delete recipe
    cy.findByText("Edit").click().waitForRouteChange();
    cy.findByText("Delete").click().waitForRouteChange();

    // Recipe deletion should redirect to home
    cy.url().assertRoute("/");

    // There should be no more recipes listed
    cy.findByText("There are no recipes");
    */
});
