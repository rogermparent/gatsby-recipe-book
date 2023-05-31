describe("Recipe page", () => {
  it("Should be accessible", () => {
    cy.setFixture("single");
    cy.visit("/recipe/view/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findByText("Test Recipe");

    cy.injectAxe();
    cy.checkA11y();
  });

  it("Can go to the recipe edit page", () => {
    cy.setFixture("single");
    cy.visit("/recipe/view/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findByText("Edit").click();
    cy.waitForRouteChange();
    cy.assertRoute("/recipe/edit/test-recipe");
    cy.findByText("Edit Recipe");
  });
});
