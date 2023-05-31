/// <reference types="Cypress" />

describe("New Recipe Page", () => {
  it("Should be accessible", () => {
    cy.clearFixture();
    cy.visit("/recipe/new");
    cy.waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Should successfully create a new recipe and redirect to the created recipe", () => {
    cy.clearFixture();
    cy.visit("/recipe/new");
    cy.waitForRouteChange();

    // Fill out recipe form

    // Basic fields
    cy.findByLabelText("Slug").type("created-recipe");
    cy.findByLabelText("Name").type("Created Recipe");
    cy.findAllByLabelText("Quantity").should("have.length", 0);

    cy.findByText("Add Ingredient").click();
    cy.findAllByLabelText("Quantity").should("have.length", 1);
    cy.focused().should("have.attr", "name", "ingredients.0.quantity");
    cy.focused().type("1");

    cy.tab();
    cy.focused().should("have.attr", "name", "ingredients.0.unit");

    cy.tab();
    cy.focused().should("have.attr", "name", "ingredients.0.ingredient");
    cy.focused().type("egg");

    cy.tab();
    cy.focused().should("have.attr", "name", "ingredients.0.note");

    cy.focused().type("{enter}");
    cy.findAllByLabelText("Quantity").should("have.length", 2);
    cy.focused().should("have.attr", "name", "ingredients.1.quantity");

    // Submit
    cy.findByText("Submit Recipe").click();

    cy.waitForRouteChange();

    // Recipe form should redirect to home
    cy.url().assertRoute("/recipe/view/created-recipe");
    cy.findByText("Created Recipe");
  });
});
