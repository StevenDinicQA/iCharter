import testData from "../testData.json";
import PageObjects from "../../pages/iCharter-pages";
import { should } from "chai";

const pageObjects = new PageObjects();
class CustomerProfile {
  editCustomerUser() {
    pageObjects.getCustomerAvatar().click();
    pageObjects.getCustomerMyAccBtn().click();
    cy.wait(500);
    pageObjects.getCustomerName().clear();
    cy.wait(500);
    pageObjects.getCustomerName().clear().type("Mark");
    pageObjects.getCustomerSurame().clear().type("Mayson");
    pageObjects.getCustomerEmail().should("be.visible");
    pageObjects.getCustomerName().should("have.value", "Mark");
    pageObjects.getCustomerSurame().should("have.value", "Mayson");
    pageObjects.getCustomerPassword().type("Test123!*");
    pageObjects.getSaveButtonCustomer().should("be.enabled");
  }

  logoutCustomerUser() {
    pageObjects.getCustomerAvatar().click();
    pageObjects.getLogoutCustomer().click();
    pageObjects.getLocationHomepageInput().should("be.visible");
  }

  deleteCustomerUser() {
    pageObjects.getCustomerAvatar().click();
    pageObjects.getCustomerMyAccBtn().click();
    cy.wait(500);
    pageObjects.getDeleteCustomer().click();
    pageObjects.getDeleteWindow().should('be.visible');
    pageObjects.getEnterPassForCustomerDelAcc().type("Test123!*");
    pageObjects.getCancelDelAcc().click();
    // pageObjects.getDeleteAccBtn().click();
  }

  goToMarketplaceCustomer(location: string, link: string) {
    pageObjects
      .getLocationHomepageInput()
      .type(location)
      .type("{downArrow}")
      .type("{enter}");
    cy.wait(400);
    // pageObjects.getDateHomepageInput().invoke('');
    cy.wait(500);
    pageObjects.getGuestsHomepageInput().click();
    pageObjects.getGuestsHomepageInput().click();
    pageObjects.getGuestsHomepageInput().click();
    cy.wait(500);
    pageObjects.getSearchButtonHomepage().click();
    cy.url().should("eq", link);
  }

  searchExploreAll(link: string) {
    pageObjects.getExploreAllButton().click();
    cy.url().should("eq", link);
  }

  bookListingAsCustomer(mobileNumber: string, zipCode: string) {
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
    pageObjects.getMobileNumber().type(mobileNumber);
    pageObjects.getZipCode().type(zipCode);
    pageObjects.getNextDetailsBtn().click();
    cy.wait(800);
    pageObjects.getCreditCardInput().type("4242 4242 4242 4242");
    pageObjects
      .getCreditCardInput()
      .should("contain.text", "4242 4242 4242 4242");
    pageObjects.getExpirationDate().type("02 / 26");
    pageObjects.getCvvCode().type("123");
    pageObjects.getNextButtonConfirmation().click();
    cy.wait(800);
  }

  placeICharterBid(link: string) {
    pageObjects.getPlaceABidButton().click();
    cy.url().should("eq", link);
    pageObjects.getBidFilter().should("be.visible");
  }

  filtersPositive(link: string) {
    cy.wait(1000);
    pageObjects.getSearchButtonHomepage().click();
    cy.url().should("eq", link);
    pageObjects.getOpenDepartureTime().click();
    cy.wait(200);
    pageObjects.getDepartureMorning().click();
    cy.wait(200);
    pageObjects.getOpenDuration().click();
    cy.wait(200);
    pageObjects.getFourHrs().click();
    cy.wait(200);
    pageObjects.getOpenPrice().click();
    cy.wait(200);
    pageObjects.getToFourHundred().click();
    pageObjects
      .getNoExperienceText()
      .should("not.contain.text", "No results available");
  }

  filtersNegative(link: string) {
    cy.wait(1000);
    pageObjects.getSearchButtonHomepage().click();
    cy.url().should("eq", link);
    pageObjects.getOpenDepartureTime().click();
    cy.wait(200);
    pageObjects.getDepartureEvening().click();
    cy.wait(200);
    pageObjects.getOpenDuration().click();
    cy.wait(200);
    pageObjects.getTwoHrs().click();
    cy.wait(200);
    pageObjects.getOpenSeason().click();
    cy.wait(200);
    pageObjects.getWinterSeason().click();
    pageObjects
      .getNoExperienceText()
      .should("contain.text", "No results available");
  }

  emptyFieldSearch(link: string) {
    pageObjects.getSearchButtonHomepage().click();
    cy.wait(400);
    cy.url().should("eq", link);
  }

  specificLocation(location: string, link: string) {
    cy.wait(1300);
    pageObjects
      .getLocationHomepageInput()
      .type(location)
      .type("{downArrow}")
      .type("{enter}");
    cy.wait(1000);
    cy.url().should("eq", link);
  }

  advancedSearch(location: string, link: string) {
    cy.wait(400);
    pageObjects
      .getLocationHomepageInput()
      .type(location)
      .type("{downArrow}")
      .type("{enter}");
    cy.wait(400);
    // pageObjects.getDateHomepageInput().invoke('');
    cy.wait(500);
    pageObjects.getGuestsHomepageInput().click();
    pageObjects.getGuestsHomepageInput().click();
    pageObjects.getGuestsHomepageInput().click();
    cy.wait(500);
    pageObjects.getSearchButtonHomepage().click();
    cy.url().should("eq", link);
  }

  specificDate(link: string) {
    // pageObjects.getDateHomepageInput().invoke('');
    cy.wait(400);
    pageObjects.getSearchButtonHomepage().click();
    cy.url().should("eq", link);
  }

  mapMarketplaceCheck() {
    cy.wait(1000);
    pageObjects.getSearchButtonHomepage().click();
    cy.wait(800);
    pageObjects.getMapOption().should("be.visible");
    pageObjects.getMapOption().click();
    cy.wait(800);
    pageObjects.getMapLocationFlorida().should("be.visible");
  }

  alternativeListingsCheck(location: string, link: string) {
    this.specificLocation(location, link);
    pageObjects.getFullListingsList().should("be.visible");
  }

  cityStateListingsCheck(location: string, link: string) {
    this.specificLocation(location, link);
    pageObjects.getListingsLocation().each(($el) => {
      cy.wrap($el).should("contain.text", "Clearwater");
    });
  }

  captainProfileLocationCheck(location: string, link: string) {
    this.specificLocation(location, link);
    cy.wait(1500);
    pageObjects.getSortingDropdown().type("Price: Low to High").type("{enter}");
    cy.wait(1200);
    pageObjects.getSecondListing().first().click();
    cy.wait(1500);
    pageObjects.getCaptainProfileCheck().should("be.visible");
    pageObjects.getCaptainProfileCheck().click({ force: true });
    cy.wait(1500);
    pageObjects.getCaptainLocation().should("be.visible");
    pageObjects.getCaptainLocation().should("contain.text", "Tampa, Florida");
  }

  cityStateLocationDropdownCheck(location: string) {
    cy.wait(1300);
    pageObjects.getLocationHomepageInput().type(location).type("{downArrow}");
    cy.wait(1200);
    pageObjects.getListingsDropdown().should("be.visible");
    pageObjects.getLocationList().each(($el) => {
      cy.wrap($el).should("be.visible");
      cy.wrap($el).should("have.class", "pac-item");
    });
  }
}

export default new CustomerProfile();
