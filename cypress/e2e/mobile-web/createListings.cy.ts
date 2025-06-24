/// <reference types="cypress" />

describe("Create Listings", () => {
  it("creates listings", () => {
    cy.mobileWebSetupAndLogin('qa+charter@oneseventech.com', 'Test123!*')
    cy.createListingsPage1()
    cy.createListingsPage2()
    cy.createListingsPage3()
    cy.createListingsPage4()
    cy.createListingsPage5()
  });
});