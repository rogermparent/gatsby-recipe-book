describe("Recipe Edit Page", () => {
  it("Should be accessible", () => {
    cy.setFixture("single");
    cy.visit("/recipe/edit/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Edit Recipe");

    cy.injectAxe();
    cy.checkA11y();
  });

  it("Can edit a recipe", () => {
    cy.setFixture("single");
    cy.visit("/recipe/edit/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Edit Recipe");

    // Fill out and submit edit form
    cy.get("input[name=name]").clear().type("Edited Test Recipe");
    cy.get("form").findByText("Edit Recipe").click();
    cy.waitForRouteChange();

    // Edit form submission should redirect to recipe page
    cy.url().assertRoute("/recipe/view/test-recipe");
    cy.get("body").findByText("Edited Test Recipe");
  });

  it("Can delete a recipe", () => {
    cy.setFixture("single");
    cy.visit("/recipe/edit/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Edit Recipe");

    cy.findByText("Delete").click().waitForRouteChange();

    // Recipe deletion should redirect to home
    cy.url().assertRoute("/");

    // There should be no more recipes listed
    cy.findByText("There are no recipes");
  });
});
