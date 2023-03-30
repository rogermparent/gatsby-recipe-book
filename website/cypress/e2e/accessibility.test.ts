/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.visit("/").get("main");
    cy.injectAxe();
  });
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y();
  });
  it("Navigates to Best Ever Meat Loaf and checks for accessibility violations", () => {
    cy.findByText(/Best Ever Meat Loaf/i)
      .click()
      .checkA11y();
  });
});
