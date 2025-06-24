/// <reference types="cypress" />

describe("TC34 - My Account - Notifications Page Control", () => {
  it("My Account - Notifications Page Control", () => {
    cy.mobileWebSetupAndLogin("emre+1@oneseventech.com", "Test123!*");
    cy.checkText('Listings')
    cy.getNotificationsPage()
  });
});
