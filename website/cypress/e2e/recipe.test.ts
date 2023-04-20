describe("Recipe page", () => {
  it("Should be accessible", () => {
    cy.setFixture("single");
    cy.visit("/recipe/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findByText("Test Recipe");

    cy.injectAxe();
    cy.checkA11y();
  });
});
