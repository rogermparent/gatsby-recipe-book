/// <reference types="Cypress" />

describe("Homepage", () => {
  it("Should be accessible with no items", () => {
    cy.clearFixture();
    cy.visit("/");
    cy.waitForRouteChange();
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Should be accessible with items", () => {
    cy.visit("/");
    cy.waitForRouteChange();
    cy.setFixture("populated");
    cy.visit("/");
    cy.waitForRouteChange();
    cy.findByText("Masa Harina Cornbread");
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Can go to the recipe creation page", () => {
    cy.visit("/");
    cy.waitForRouteChange();
    cy.clearFixture();
    cy.visit("/");
    cy.waitForRouteChange();
    cy.findByText("New Recipe").click();
    cy.waitForRouteChange();
    cy.findByText("New Recipe");
    cy.assertRoute("/recipe/new");
  });
});
