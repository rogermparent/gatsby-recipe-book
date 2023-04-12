describe("Recipe page", () => {
  it("Should be accessible", () => {
    cy.task("setFixture", "single");
    cy.visit("/recipe/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findByText("Test Recipe");

    cy.injectAxe();
    cy.checkA11y();
  });

  it("Can go to the recipe creation page", () => {
    cy.task("setFixture", "single");
    cy.visit("/recipe/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findByText("Edit").click();
    cy.waitForRouteChange();
    cy.assertRoute("/recipe/test-recipe/edit");
  });
});
