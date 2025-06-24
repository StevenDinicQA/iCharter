/// <reference types="cypress" />
import * as testData from "../../fixtures/testData.json";
import login from "../../fixtures/steps/login";
import signUp from "../../fixtures/steps/sign-up";
import captainProfile from "../../fixtures/steps/captain-profile";
import customerProfile from "../../fixtures/steps/customer-profile";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("iCharter automated tests", () => {
  beforeEach("Go to dashboard page", () => {
    cy.visit("/");
  });

  it("ICHARTER-1 Sign Up as Charter User with Valid Details", () => {
    let firstName = testData.firstName;
    let lastName = testData.lastName;
    let signUpEmail = testData.signUpEmailCaptain;
    let password = testData.validTestPassword;
    signUp.signUpCharter(firstName, lastName, signUpEmail, password, password);
  });

  it.only("ICHARTER-2 Sign Up as Customer User with Valid Details", () => {
    let firstName = testData.firstName;
    let lastName = testData.lastName;
    let signUpEmail = testData.signUpEmailCustomer;
    let password = testData.validTestPassword;
    signUp.signUpCustomer(firstName, lastName, signUpEmail, password, password);
  });

  it("ICHARTER-3 Sign Up with Existing Email", () => {
    let firstName = testData.firstName;
    let lastName = testData.lastName;
    let signUpEmail = testData.signUpEmailCustomer;
    let password = testData.validTestPassword;
    signUp.signUpCustomer(firstName, lastName, signUpEmail, password, password);
    signUp.existingEmailCheck();
  });

  it("ICHARTER-4 Sign Up with Weak Password", () => {
    let firstName = testData.firstName;
    let lastName = testData.lastName;
    let signUpEmail = testData.signUpEmailCustomer;
    let weakPassword = testData.weakPassword;
    signUp.signUpCustomer(
      firstName,
      lastName,
      signUpEmail,
      weakPassword,
      weakPassword
    );
    signUp.weakPasswordCheck();
  });

  it("ICHARTER-5 Login as Charter User with Valid Credentials", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
  });

  it("ICHARTER-6 Login as Customer User with Valid Credentials", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
  });

  it("ICHARTER-7.1 Login with Incorrect Credentials", () => {
    let invalidEmail = testData.invalidEmail;
    let password = testData.validTestPassword;
    login.signIn(invalidEmail, password);
    login.inccorectCredentials();
  });

  it("ICHARTER-7.2 Login with Incorrect Credentials", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let invalidpassword = testData.invalidTestPassword;
    login.signIn(emailCustomer, invalidpassword);
    login.inccorectCredentials();
  });

  it("ICHARTER-9 Access Restricted Page without Login", () => {
    login.bookingWithoutLogin();
  });

  it("ICHARTER-10 Initiate Password Reset", () => {
    let email = testData.validTestCaptainEmail;
    login.forgotPasswordCheck(email);
  });

  it("ICHARTER-12 Password Reset with Invalid Token", () => {
    let validEmail = testData.validTestCustomerEmail;
    let code = testData.invalidCode;
    let newPass = testData.newPass;
    let confirmNewPass = testData.newPass
    login.invalidTokenCheck(validEmail, code, newPass, confirmNewPass);
  });

  it("ICHARTER-13 Reset Password with Valid Email", () => {
    let validEmail = testData.validTestCustomerEmail;
    login.validEmailCheck(validEmail);
  });

  it("ICHARTER-14 Reset Password with Invalid Email", () => {
    let invalidEmail = testData.invalidEmail;
    login.invalidEmailCheck(invalidEmail);
  });

  it("ICHARTER-15 Complete Profile as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    let companyName = testData.companyName;
    let captainName = testData.captainName;
    let captainPhone = testData.captainPhoneNumber;
    let yearsOfExp = testData.yearsOfExp;
    captainProfile.editCaptainProfile(
      companyName,
      captainName,
      captainPhone,
      yearsOfExp
    );
  });

  it("ICHARTER-16 Create Listing as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    let tripName = testData.tripName;
    let expDescription = testData.experienceDescription;
    let boatDescription = testData.boatDescription;
    let directions = testData.directionsInput;
    let cancelDescription = testData.cancelationDescription;
    captainProfile.createOneListing(
      tripName,
      expDescription,
      boatDescription,
      directions,
      cancelDescription
    );
  });

  it("ICHARTER-17 Publish Listing as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    captainProfile.publishListingToggle();
  });

  it("ICHARTER-18 Duplicate Listing as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    captainProfile.duplicateListingButton();
  });

  it("ICHARTER-19 Delete Listing as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    captainProfile.deleteListingButton();
  });

  it("ICHARTER-20 Edit Listing as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    let tripName = testData.tripName;
    let expDescription = testData.experienceDescription;
    let boatDescription = testData.boatDescriptionEdit;
    captainProfile.editOneListing(tripName, expDescription, boatDescription);
  });

  it("ICHARTER-25 Edit Profile as Charter", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    let companyName = testData.companyName;
    let captainName = testData.captainName;
    let captainPhone = testData.editedCaptainPhone;
    let yearsOfExp = testData.editedYearsOfExp;
    captainProfile.editCaptainProfile(
      companyName,
      captainName,
      captainPhone,
      yearsOfExp
    );
  });

  it("ICHARTER-26 Edit Profile with Invalid Information", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    let captainName = testData.captainName;
    let captainPhone = testData.editedCaptainPhone;
    let yearsOfExp = testData.invalidEditedYearsOfExp;
    captainProfile.invalidCaptainProfileEdit(
      captainName,
      captainPhone,
      yearsOfExp
    );
  });

  it("ICHARTER-27 Logout as Charter User", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    captainProfile.logoutCaptain();
  });

  it("ICHARTER-28 Delete Profile as Charter", () => {
    let emailCaptain = testData.signUpEmailCaptain;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    captainProfile.deleteCaptainUser();
  });

  it("ICHARTER-29 Publish Incomplete Listing as Charter", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
    let incompleteTripName = testData.incompleteTripName;
    let expDescription = testData.experienceDescription;
    let boatDescription = testData.boatDescription;
    let cancelDescription = testData.cancelationDescription;
    captainProfile.createIncompleteListing(
      incompleteTripName,
      expDescription,
      boatDescription,
      cancelDescription
    );
  });

  it("ICHARTER-30 Delete Account with Active Bookings", () => {
    let emailCaptain = testData.validTestCaptainEmail;
    let password = testData.validTestPassword;
    let urlCaptain = testData.captainListingsUrl;
    login.signIn(emailCaptain, password);
    login.userCaptain(urlCaptain);
    cy.wait(1500);
   
  });

  // test 31 is redundant as the Customer user's profile is immediately complete

  it("ICHARTER-32 Go to Marketplace as Customer User", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    let location = testData.locationSearchBar;
    let link = testData.marketplaceLink;
    customerProfile.goToMarketplaceCustomer(location, link);
  });

  it("ICHARTER-33 Go to Marketplace as Customer User", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    let link = testData.marketplaceLink;
    customerProfile.searchExploreAll(link);
  });

  it("ICHARTER-34 Book a Listing as Customer User", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    let mobileNumber = testData.mobileNumber;
    let zipCode = testData.zipCode;
    customerProfile.bookListingAsCustomer(mobileNumber, zipCode);
  });

  it("ICHARTER-35 Place iCharter Bid as Customer User", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    let link = testData.marketplaceLink;
    customerProfile.placeICharterBid(link);
  });

  it("ICHARTER-36 Search Listing by Filters as Customer - Positive Scenario", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    let link = testData.marketplaceLink;
    customerProfile.filtersPositive(link);
  });

  it("ICHARTER-37 Search Listing by Filters as Customer - Negative Scenario", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    let link = testData.marketplaceLink;
    customerProfile.filtersNegative(link);
  });

  it("ICHARTER-38 Edit Profile as Customer", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    customerProfile.editCustomerUser();
  });

  it("ICHARTER-39 Logout as Customer User", () => {
    let emailCustomer = testData.validTestCustomerEmail;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    customerProfile.logoutCustomerUser();
  });

  it("ICHARTER-40 Delete Profile as Customer", () => {
    let emailCustomer = testData.signUpEmailCustomer;
    let password = testData.validTestPassword;
    let urlCustomer = testData.customerListingsUrl;
    login.signIn(emailCustomer, password);
    login.userCustomer(urlCustomer);
    customerProfile.deleteCustomerUser();
  });

  it("ICHARTER-42 Empty Search Fields", () => {
    let link = testData.marketplaceLink;
    customerProfile.emptyFieldSearch(link);
  });

  it("ICHARTER-43 Specific Location", () => {
    let location = testData.locationSearchBar;
    let link = testData.marketplaceLink;
    customerProfile.specificLocation(location, link);
  });

  it("ICHARTER-44 Advanced Search", () => {
    let location = testData.locationSearchBar;
    let link = testData.marketplaceLink;
    customerProfile.advancedSearch(location, link);
  });

  it("ICHARTER-45 Specific Dates Range", () => {
    let link = testData.marketplaceLink;
    customerProfile.specificDate(link);
  });

  it("ICHARTER-46 Verify Default Map Display in Marketplace Section", () => {
    customerProfile.mapMarketplaceCheck();
  });

  it("ICHARTER-47 Verify Display of Alternative Listings When No Exact Matches Found", () => {
    let location = testData.alternativeSearchLocation;
    let link = testData.marketplaceLink;
    customerProfile.alternativeListingsCheck(location, link);
  });

  it("ICHARTER-48 Display Address on Listing Cards as City-State in Marketplace", () => {
    let location = testData.locationSearchBar;
    let link = testData.marketplaceLinkClearWater;
    customerProfile.cityStateListingsCheck(location, link);
  });

  it("ICHARTER-49 Display Address on Listing Cards as City-State in Charter Profile", () => {
    let location = testData.locationSearchBar;
    let link = testData.marketplaceLinkClearWater;
    customerProfile.captainProfileLocationCheck(location, link);
  });

  it("ICHARTER-50 Display Location as City-State from Dropdown Selection", () => {
    let location = testData.locationSearchBar;
    customerProfile.cityStateLocationDropdownCheck(location);
  });
});
