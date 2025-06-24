/// <reference types="cypress" />

describe("TC32 - Log-Out", () => {
  it("Log-Out", () => {
    cy.mobileWebSetupAndLogin("emre+1@oneseventech.com", "Test123!*");
    cy.checkText('Listings')
    cy.userLogout()

  });
});
