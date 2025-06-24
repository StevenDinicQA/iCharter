import { delay } from "cypress/types/bluebird";
import testData from "../testData.json";
import PageObjects from "../../pages/iCharter-pages";

const pageObjects = new PageObjects();

class LoginSteps {
  signIn(email: string, password: string) {
    cy.intercept("/auth/sign-in?_rsc=acgkz").as("homepageRequest");
    cy.wait("@homepageRequest");
    cy.wait(2000);
    pageObjects.getSignIn().should("be.visible");
    pageObjects.getSignIn().click({ force: true });
    pageObjects.getSignInPasswordInput().should("be.visible");
    cy.wait(1200);
    pageObjects.getSignInEmailInput().should("be.visible");
    pageObjects.getSignInEmailInput().should("be.empty");
    pageObjects.getSignInEmailInput().type(email);
    pageObjects.getSignInPasswordInput().should("be.visible");
    pageObjects.getSignInPasswordInput().type(password);
    cy.wait(1000);
    pageObjects.getLoginButton().click();
  }

  userCustomer(link: string) {
    cy.wait(1500);
    pageObjects.getLocationHomepageInput().should("be.visible");
    cy.url().should("eq", link);
  }

  userCaptain(link: string) {
    cy.wait(1500);
    pageObjects.getICharterLogo().should("be.visible");
    pageObjects.getListingsTable().should("be.visible");
    cy.url().should("eq", link);
  }

  inccorectCredentials() {
    cy.wait(500);
    pageObjects.getInccorectCredText().should("be.visible");
    pageObjects
      .getInccorectCredText()
      .should("have.text", testData.invalidCredText);
  }

  bookingWithoutLogin() {
    cy.wait(1000);
    pageObjects.getSearchButtonHomepage().click();
    cy.wait(1000);
    pageObjects.getSortingDropdown().type("Price: Low to High").type("{enter}");
    cy.wait(1200);
    pageObjects.getFirstListing().first().click();
    cy.wait(1000);
    pageObjects.getCheckAvailability().click();
    pageObjects.getNextMonthArrowBtn().click();
    cy.wait(500);
    pageObjects.getCalendarSunday().click();
    cy.wait(500);
    pageObjects.getApplyButton().click();
    cy.wait(500);
    pageObjects.getBookButton().click();
    cy.wait(800);
    pageObjects.getSignInEmailInput().should("be.visible");
  }

  forgotPasswordCheck(email: string) {
    cy.wait(1500);
    pageObjects.getSignIn().should("be.visible");
    pageObjects.getSignIn().click();
    cy.wait(1000);
    pageObjects.getSignInEmailInput().should("be.visible");
    pageObjects.getForgotPassword().click();
    cy.wait(1300);
    pageObjects.getResetPassComponent().should("be.visible");
    pageObjects.getForgotPassEmailInput().type(email);
    pageObjects.getResetPassButton().click();
  }

  invalidTokenCheck(
    email: string,
    code: string,
    newPass: string,
    confirmNewPass: string
  ) {
    this.forgotPasswordCheck(email);
    cy.wait(300);
    pageObjects.getSixDigitCode().type(code);
    pageObjects.getNewPasswordInput().type(newPass);
    pageObjects.getConfirmNewPassInput().type(confirmNewPass);
    cy.wait(400);
    pageObjects.getResetPassButton().click();
    cy.wait(200);
    pageObjects.getInvalidCodeMessage().should("be.visible");
  }
  validEmailCheck(email: string) {
    this.forgotPasswordCheck(email);
    cy.wait(300);
    pageObjects
      .getInvalidEmailText()
      .should("have.text", testData.invalidResetEmailText);
  }

  invalidEmailCheck(email: string) {
    this.forgotPasswordCheck(email);
    cy.wait(300);
    pageObjects
      .getInvalidEmailText()
      .should("have.text", testData.invalidResetEmailText);
  }
}

export default new LoginSteps();
