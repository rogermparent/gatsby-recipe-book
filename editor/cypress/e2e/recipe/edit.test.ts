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
    const oldTitle = "Test Recipe";
    const newTitle = "Edited Recipe";

    cy.setFixture("single");
    cy.visit("/recipe/edit/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Edit Recipe");

    // Fill out and submit edit form
    cy.get("input[name=name]").clear().type(newTitle);
    cy.findByText("Submit Edit").click();

    // Edit form submission should redirect to recipe page
    cy.get("body").findByText(newTitle, { timeout: 10000 });
    cy.url().assertRoute("/recipe/view/test-recipe");

    // Only the new recipe should exist

    cy.visit("/");
    cy.waitForRouteChange();

    cy.findByText(newTitle);
    cy.findByText(oldTitle).should("not.exist");
  });

  it("Can copy a recipe", () => {
    const newTitle = "Copied Recipe";
    const newSlug = "copied-recipe";

    cy.setFixture("single");
    cy.visit("/recipe/edit/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Edit Recipe");

    // Fill out and submit edit form
    cy.get("input[name=name]").clear().type(newTitle);
    cy.findByLabelText("Slug").clear();
    cy.findByLabelText("Copy").click();
    cy.findByText("Submit Edit").click();

    // Edit form submission should redirect to recipe page
    cy.get("body").findByText(newTitle, { timeout: 10000 });
    cy.url().assertRoute("/recipe/view/" + newSlug);

    // The original recipe and new recipe should both exist

    cy.visit("/");
    cy.waitForRouteChange();

    cy.findByText("Test Recipe");
    cy.findByText(newTitle);
  });

  it("Can delete a recipe", () => {
    cy.setFixture("single");
    cy.visit("/recipe/edit/test-recipe", {
      timeout: 10000,
    });
    cy.waitForRouteChange();
    cy.findAllByText("Edit Recipe");

    cy.findByText("Delete").click();

    // We should be on the homepage seeing a message about there being no recipes
    cy.findByText("There are no recipes", { timeout: 10000 });
    cy.url().assertRoute("/");
  });
});
