describe("Ingredients Page", () => {
  it("Should be accessible", () => {
    cy.setFixture("single");
    cy.visit("/ingredients", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Ingredients");

    cy.injectAxe();
    cy.checkA11y();
  });

  it("Should display and clear ingredients from the single fixture", () => {
    cy.setFixture("single");
    cy.visit("/ingredients");
    cy.waitForRouteChange();
    cy.findAllByText("Ingredients");

    cy.findByText("First Ingredient (1)");
    cy.findByText("Other Ingredient (1)").click();

    cy.waitForRouteChange();
    cy.assertRoute("/ingredients/other-ingredient");
    cy.findByText("Test Recipe").click();

    cy.waitForRouteChange();
    cy.assertRoute("/recipe/view/test-recipe");

    cy.clearFixture();
    cy.visit("/ingredients");
    cy.waitForRouteChange();

    cy.findByText("First Ingredient (1)").should("not.exist");
    cy.findByText("Other Ingredient (1)").should("not.exist");
  });

  it("Should be able to navigate to a recipe through the ingredients page", () => {
    cy.setFixture("single");
    cy.visit("/ingredients");
    cy.waitForRouteChange();
    cy.findAllByText("Ingredients");

    cy.findByText("Other Ingredient (1)").click();

    cy.waitForRouteChange();
    cy.assertRoute("/ingredients/other-ingredient");
    cy.findByText("Test Recipe").click();

    cy.waitForRouteChange();
    cy.assertRoute("/recipe/view/test-recipe");
    cy.findByText("Test Recipe");
  });
});
