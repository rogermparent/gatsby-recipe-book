/// <reference types="Cypress" />

describe("Stateful E2E tests", { testIsolation: false }, () => {
  it("Loads the homepage", () => {
    cy.visit("/").waitForRouteChange();
  });
  it("Has an accessible homepage", () => {
    cy.injectAxe();
    cy.checkA11y();
  });
  it("Has no items to start", () => {
    cy.findAllByRole("listitem").should("be.empty");
  });
  it("Navigates to Best Ever Meat Loaf and checks for accessibility violations", () => {
    cy.findByText(/Best Ever Meat Loaf/i)
      .click()
      .checkA11y();
  });
});
