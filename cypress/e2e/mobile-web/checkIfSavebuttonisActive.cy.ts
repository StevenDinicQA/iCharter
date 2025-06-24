/// <reference types="cypress" />
import * as testData from '../../fixtures/testData.json'


describe("TC33 - Edit a Charter Profile", () => {
  it("Edit a Charter Profile", () => {
    cy.mobileWebSetupAndLogin(testData.validTestCaptainEmail, testData.validTesetPassword);
    cy.checkText('Listings')
    cy.getCharterProfile()
    cy.editCompanyName()
  });
});
