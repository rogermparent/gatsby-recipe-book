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
    cy.injectAxe();
    cy.checkA11y();
  });
});
