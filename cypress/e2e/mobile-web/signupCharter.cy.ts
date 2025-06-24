/// <reference types="cypress" />

describe("Sign Up", () => {
  it("creates a charter account", () => {
    cy.viewport("iphone-se2"); // Set viewport to 375 x 667
    cy.goSignUpPage();
    cy.completeSignUpForm();
  });
});
