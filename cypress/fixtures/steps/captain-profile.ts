import { delay } from "cypress/types/bluebird";
import testData from "../testData.json";
import PageObjects from "../../pages/iCharter-pages";
import { should } from "chai";

const pageObjects = new PageObjects();

class CaptainProfile {
  editCaptainProfile(
    companyName: string,
    captainName: string,
    captainPhone: string,
    yearsOfExp: string
  ) {
    pageObjects.getCaptainAvatar().click();
    pageObjects.getCaptainMyAccBtn().click();
    cy.wait(1000);
    const profilePic = "cypress\\fixtures\\testDataPictures\\1.png";
    pageObjects.getCaptainProfilePic().click();
    pageObjects.getCaptainProfilePic().selectFile(profilePic);
    cy.wait(2000);
    pageObjects.getCaptainCompanyInput().clear().type(companyName);
    pageObjects.getCaptainNameInput().clear().type(captainName);
    pageObjects.getCaptainPhoneNoInput().clear().type(captainPhone);
    cy.wait(400);
    pageObjects
      .getCaptainLocationInput()
      .clear()
      .type("Tampa, Florida")
      .type("{downArrow}")
      .type("{downArrow}")
      .type("{downArrow}")
      .type("{enter}");
    cy.wait(900);
    const licencePic = "cypress\\fixtures\\testDataPictures\\2.png";
    pageObjects.getCaptainDeleteLicenceBtn().click();
    pageObjects
      .getCaptainMasterLicenceClick()
      .click({ force: true })
      .selectFile(licencePic, { action: "drag-drop" });
    pageObjects.getCaptainYearsOfExpInput().clear().type(yearsOfExp);
    pageObjects
      .getCaptainNationalityDropdown()
      .type("American Samoa")
      .type("{downArrow}")
      .type("{enter}");
    pageObjects.getCaptainActiveMilitaryCheck().click();
    const picture1 = "cypress\\fixtures\\testDataPictures\\1.png";
    const picture2 = "cypress\\fixtures\\testDataPictures\\2.png";
    const picture3 = "cypress\\fixtures\\testDataPictures\\3.png";
    const picture4 = "cypress\\fixtures\\testDataPictures\\4.png";
    const picture5 = "cypress\\fixtures\\testDataPictures\\5.png";
    cy.wait(1000);
    pageObjects.getCaptainDeletePhotos().then(($el) => {
      cy.wrap($el).click({ multiple: true });
      cy.wait(500);
    });
    cy.wait(900);
    pageObjects
      .getCaptainPhotosAndVideosUpload()
      .click()
      .selectFile(picture1, { action: "drag-drop" })
      .selectFile(picture2, { action: "drag-drop" })
      .selectFile(picture3, { action: "drag-drop" })
      .selectFile(picture4, { action: "drag-drop" })
      .selectFile(picture5, { action: "drag-drop" });
    pageObjects.getCaptainCompanyInput().should("have.value", "John's");
    pageObjects.getCaptainNameInput().should("have.value", "John");
    pageObjects.getCaptainPhoneNoInput().should("have.value", "1226548987");
    pageObjects.getCaptainYearsOfExpInput().should("have.value", "12");
    pageObjects
      .getCaptainNationalityDropdownValue()
      .should("have.text", "Turkey");
    pageObjects.getCaptainPhotosPreview().then(($el) => {
      cy.wrap($el).should("have.class", "relative");
    });
  }

  invalidCaptainProfileEdit(
    captainName: string,
    captainPhone: string,
    yearsOfExp: string
  ) {
    pageObjects.getCaptainAvatar().click();
    pageObjects.getCaptainMyAccBtn().click();
    cy.wait(1000);
    const profilePic = "cypress\\fixtures\\testDataPictures\\1.png";
    pageObjects.getCaptainProfilePic().click();
    cy.wait(1000);
    pageObjects.getCaptainProfilePic().selectFile(profilePic);
    cy.wait(2000);
    pageObjects.getCaptainCompanyInput().clear();
    pageObjects.getCaptainNameInput().clear().type(captainName);
    pageObjects.getCaptainPhoneNoInput().clear().type(captainPhone);
    cy.wait(400);
    pageObjects
      .getCaptainLocationInput()
      .clear()
      .type("Tampa, Florida")
      .type("{downArrow}")
      .type("{enter}");
    cy.wait(400);
    const licencePic = "cypress\\fixtures\\testDataPictures\\2.png";
    pageObjects.getCaptainDeleteLicenceBtn().click();
    pageObjects
      .getCaptainMasterLicenceClick()
      .click({ force: true })
      .selectFile(licencePic, { action: "drag-drop" });
    pageObjects.getCaptainYearsOfExpInput().clear().type(yearsOfExp);
    pageObjects.getCaptainCompanyInput().should("be.empty");
    pageObjects.getCaptainNameInput().should("have.value", "John");
    pageObjects.getCaptainSaveBtn().click();
    cy.get(".go3958317564").should("be.visible");
    cy.get(".go3958317564").should(
      "contain.text",
      "companyName should not be empty"
    );
  }

  stepOneListingCreate(tripName: string, expDescription: string) {
    cy.wait(800);
    pageObjects
      .getCreateListingButton()
      .should("be.visible")
      .click({ force: true });
    cy.wait(800);
    pageObjects.getExperienceName().type(tripName);
    pageObjects.getExperienceName().should("not.be.empty");
    pageObjects.getFishingCharterExp().click();
    pageObjects.getExpDescription().type(expDescription);
    pageObjects.getExpDescription().should("not.be.empty");
    cy.wait(800);
    pageObjects.getSelectCaptain().click();
    cy.wait(800);
    const picture1 = "cypress\\fixtures\\testDataPictures\\1.png";
    const picture2 = "cypress\\fixtures\\testDataPictures\\2.png";
    const picture3 = "cypress\\fixtures\\testDataPictures\\3.png";
    const picture4 = "cypress\\fixtures\\testDataPictures\\4.png";
    const picture5 = "cypress\\fixtures\\testDataPictures\\5.png";
    pageObjects
      .getDragAndDropPics()
      .click()
      .selectFile(picture1, { action: "drag-drop" })
      .selectFile(picture2, { action: "drag-drop" })
      .selectFile(picture3, { action: "drag-drop" })
      .selectFile(picture4, { action: "drag-drop" })
      .selectFile(picture5, { action: "drag-drop" });
    pageObjects.getNextButton().click();
    cy.wait(800);
  }

  stepTwoListingCreate() {
    pageObjects
      .getSpeciesInput()
      .clear()
      .type("Angler catfish")
      .type("{downArrow}")
      .type("{enter}");
    pageObjects.getFishingTechniques().each(($el) => {
      cy.wrap($el).click();
    });
    pageObjects.getIncludedInPrice().each(($el) => {
      cy.wrap($el).click();
    });
    pageObjects.getNextButton().eq(1).click();
    cy.wait(800);
  }

  stepThreeListingCreate(boatDescription: string) {
    pageObjects.getBoatType().eq(0).type("Angler").type("{enter}");
    cy.wait(300);
    pageObjects.getBoatDescription().type(boatDescription);
    pageObjects.getBoatDescription().should("not.be.empty");
    cy.wait(800);
    pageObjects.getIncrementGuestNumber().click();
    pageObjects.getDuration().eq(1).type("6 hours").type("{enter}");
    pageObjects.getDepartureTimeHour().clear().type("6");
    pageObjects.getDepartureTimeHour().should("have.value", "6");
    pageObjects.getDepartureTimeMinute().clear().type("30");
    pageObjects.getAvailability().eq(0).click();
    pageObjects.getAvailability().eq(1).click();
    pageObjects.getAvailability().eq(2).click();
    pageObjects.getAvailability().eq(3).click();
    pageObjects.getAvailability().eq(4).click();
    pageObjects.getAvailability().eq(5).click();
    pageObjects.getAvailability().eq(6).click();
    pageObjects.getSeasonalExp().eq(2).type("summer").type("{enter}");
    pageObjects.getFacilities().each(($el) => {
      cy.wrap($el).click();
    });
    pageObjects.getNextButton().click();
    cy.wait(800);
  }

  stepFourListingCreate(directions: string) {
    pageObjects
      .getStreetAddressInput()
      .type("Coachman Park")
      .type("{downArrow}")
      .type("{enter}");
    cy.wait(400);
    pageObjects.getStreetAddressInput().type("{downArrow}").type("{enter}");
    cy.wait(1000);
    pageObjects.getDirectionsInput().type(directions);
    pageObjects.getDirectionsInput().should("not.be.empty");
    pageObjects.getNextButtonStepFour().click();
    cy.wait(800);
  }

  stepFiveListingCreate(cancelDescription: string) {
    pageObjects.getPublicModel().click();
    pageObjects.getBidInput().type("1200");
    pageObjects.getSpecialDiscountInput().eq(0).type("25").type("{enter}");
    pageObjects.getSpecialDiscountSingleValue().eq(0).should("not.be.empty");
    pageObjects.getSpecialDiscountInput().eq(1).type("15").type("{enter}");
    pageObjects.getSpecialDiscountSingleValue().eq(1).should("not.be.empty");
    pageObjects.getSpecialDiscountInput().eq(2).type("10").type("{enter}");
    pageObjects.getSpecialDiscountSingleValue().eq(2).should("not.be.empty");
    pageObjects.getPaymentMethodChecks().eq(0).click();
    pageObjects.getPaymentMethodChecks().eq(1).click();
    pageObjects.getPaymentMethodChecks().eq(2).click();
    pageObjects.getPaymentMethodChecks().eq(3).click();
    pageObjects.getCancelDescription().type(cancelDescription);
    pageObjects.getCancelDescription().should("not.be.empty");
    // pageObjects.getPublishButton().click();
    cy.wait(800);
  }

  createOneListing(
    tripName: string,
    expDescription: string,
    boatDescription: string,
    directions: string,
    cancelDescription: string
  ) {
    this.stepOneListingCreate(tripName, expDescription);
    this.stepTwoListingCreate();
    this.stepThreeListingCreate(boatDescription);
    this.stepFourListingCreate(directions);
    this.stepFiveListingCreate(cancelDescription);
  }

  createIncompleteListing(
    tripName: string,
    expDescription: string,
    boatDescription: string,
    cancelDescription: string
  ) {
    this.stepOneListingCreate(tripName, expDescription);
    this.stepTwoListingCreate();
    this.stepThreeListingCreate(boatDescription);
    this.stepFiveListingCreate(cancelDescription);
  }

  editOneListing(
    tripName: string,
    expDescription: string,
    boatDescription: string
  ) {
    pageObjects.getEditListing().click();
    this.stepOneListingCreate(tripName, expDescription);
    this.stepTwoListingCreate();
    this.stepThreeListingCreate(boatDescription);
    pageObjects.getNextButton().click();
    pageObjects.getNextButtonStepFour().click();
    pageObjects.getPublishButton().click();
  }

  publishListingToggle() {
    pageObjects.getPublishToggle().click();
    pageObjects.getPublishToggle().should("have.class", testData.publishToggle);
  }

  duplicateListingButton() {
    pageObjects.getDuplicateTrip().click();
  }

  deleteListingButton() {
    pageObjects.getDeleteTrip().click();
  }

  logoutCaptain() {
    pageObjects.getCaptainAvatar().click();
    pageObjects.getCaptainLogOutBtn().click();
    pageObjects.getLocationHomepageInput().should("be.visible");
  }

  deleteCaptainUser() {
    pageObjects.getWelcomeDiv().type("{esc}");
    pageObjects.getCaptainAvatar().click();
    pageObjects.getCaptainMyAccBtn().click();
    cy.intercept("/home/settings/login?_rsc=1f746").as("captainSettings");
    cy.wait("@captainSettings");
    pageObjects.getDeleteCaptainAccount().scrollIntoView();
    pageObjects.getDeleteCaptainAccount().click();
  }
}

export default new CaptainProfile();
