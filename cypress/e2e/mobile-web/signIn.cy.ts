/// <reference types="cypress" />

describe("TC30 - Sign - In", () => {
  it("Sign - In", () => {
    cy.mobileWebSetupAndLogin("emre+1@oneseventech.com", "Test123!*");
    cy.checkText('Listings')
  });
});
