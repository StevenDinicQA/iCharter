// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command definition for cy.waitUntil()
// typically custom commands are added in this support folder
// so it makes sense to put their TypeScript definitions here
// from the JavaScript specs loads this file using
// the triple slash "reference" comment like this:
//
// /// <reference path="../support/index.d.ts" />
declare namespace Cypress {
  interface Chainable {
    //*****UI method variables*****
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    //dataCy(value: string): Chainable<Element>

    /**
     * Custom command that adds two given numbers
     */
    userLogin(username: string, password: string): void;
    login(username: string, password: string): void;
    checkText(containsText: string): void;
    checkGetCss(getCss: string): void;
    goLoginPage(): void;
    mobileWebSetupAndLogin(username: string, password: string): void
    checkHomepage(): void;
    userLogout(): void;
    getCharterProfile(): void;
    editCompanyName(): void;
    getNotificationsPage(): void;
    uploadImage(): void;
    createListingsPage1(): void;
    createListingsPage2(): void;
    createListingsPage3(): void;
    createListingsPage4(): void;
    createListingsPage5(): void;
    uploadSingleFile(fileName: string): void;
    uploadCharterProfilePic(imgName: string): void;
    goSignUpPage(): void;
    completeSignUpForm(): void;
    randomEmail(): void;
    clickNextButton(): void;
    signInCustomer(): void;
    signInCharter(): void;
    webSetupAndLogin(username: string, password: string): void
    clickNextButtonTillPublishButton(): void;
    goMarketPage(): void;
    placeiCharterBid(): void;
  }
}
