import icharterSelectors from "../selectors/iCharter-selectors.json";

class PageObjects {
  getSignIn() {
    return cy.get(icharterSelectors.homepage.signIn);
  }

  getSignUp() {
    return cy.get(icharterSelectors.homepage.signUp);
  }

  getListYourBoat() {
    return cy.get(icharterSelectors.homepage.listYourBoat);
  }

  getHomePageTitle() {
    return cy.get(icharterSelectors.homepage.homepageTitle);
  }

  getLocationHomepageInput() {
    return cy.get(icharterSelectors.homepage.locationHomepageInput);
  }

  getDateHomepageInput() {
    return cy.get(icharterSelectors.homepage.dateHomepageInput);
  }

  getDateNextMonth() {
    return cy.get(icharterSelectors.homepage.dateNextMonth);
  }

  getGuestsHomepageInput() {
    return cy.get(icharterSelectors.homepage.guestsHomepageInput);
  }

  getSearchButtonHomepage() {
    return cy.get(icharterSelectors.homepage.searchButtonHomepage);
  }

  getPlaceABidButton() {
    return cy.get(icharterSelectors.homepage.placeABidHomepageButton);
  }

  getExploreAllButton() {
    return cy.get(icharterSelectors.homepage.exploreAllHomepageButton);
  }

  getBrowseByExperienceText() {
    return cy.get(icharterSelectors.homepage.browseByExperienceText);
  }

  getBrowseByExperienceOne() {
    return cy.get(icharterSelectors.homepage.browseExperienceOne);
  }

  getBrowseByExperienceTwo() {
    return cy.get(icharterSelectors.homepage.browseExperienceTwo);
  }

  getPopularDestinations() {
    return cy.get(icharterSelectors.homepage.popularDestinations);
  }

  getPopularDestinationsOne() {
    return cy.get(icharterSelectors.homepage.popularDestinationOne);
  }

  getPopularDestinationsTwo() {
    return cy.get(icharterSelectors.homepage.popularDestinationTwo);
  }

  getPopularDestinationsThree() {
    return cy.get(icharterSelectors.homepage.popularDestinationThree);
  }

  getTestemonialPictures() {
    return cy.get(icharterSelectors.homepage.testemonialPictures);
  }

  getListYourBoatCTA() {
    return cy.get(icharterSelectors.homepage.listYourBoatCTA);
  }

  getSocials() {
    return cy.get(icharterSelectors.homepage.socials);
  }

  getOtherLinks() {
    return cy.get(icharterSelectors.homepage.otherLinks);
  }

  getMarketplaceFooter() {
    return cy.get(icharterSelectors.homepage.marketplaceFooter);
  }

  getTopListingsFooter() {
    return cy.get(icharterSelectors.homepage.topListingsFooter);
  }

  getPopularDestinationsFooter() {
    return cy.get(icharterSelectors.homepage.popularDestinationsFooter);
  }

  getFaqFooter() {
    return cy.get(icharterSelectors.homepage.faqFooter);
  }

  getPrivacyAndTermsFooter() {
    return cy.get(icharterSelectors.homepage.privacyAndTermsFooter);
  }

  getSendFeedbackFooter() {
    return cy.get(icharterSelectors.homepage.sendFeedbackFooter);
  }

  getContactUsFooter() {
    return cy.get(icharterSelectors.homepage.contactUsFooter);
  }

  // sign up locators

  getCharterUserIcon() {
    return cy.get(icharterSelectors.signUpPage.charterUser);
  }

  getCustomerUserIcon() {
    return cy.get(icharterSelectors.signUpPage.customerUser);
  }

  getSignUpFirstName() {
    return cy.get(icharterSelectors.signUpPage.firstNameInput);
  }

  getSignUpLastName() {
    return cy.get(icharterSelectors.signUpPage.lastNameInput);
  }

  getSignUpEmailInput() {
    return cy.get(icharterSelectors.signUpPage.emailAddressInput);
  }

  getSignUpPasswordInput() {
    return cy.get(icharterSelectors.signUpPage.passwordInput);
  }

  getSignUpRepeatPasswordInput() {
    return cy.get(icharterSelectors.signUpPage.repeatPasswordInput);
  }

  getCreateAccBtn() {
    return cy.get(icharterSelectors.signUpPage.createAccountBtn);
  }

  getSignInButton() {
    return cy.get(icharterSelectors.signUpPage.signInBtn);
  }

  getExistingMailText(){
    return cy.get(icharterSelectors.signUpPage.existingEmail);
  }

  // sign in locators

  getSignInEmailInput() {
    return cy.get(icharterSelectors.signInPage.emailInput);
  }

  getSignInPasswordInput() {
    return cy.get(icharterSelectors.signInPage.passwordInput);
  }

  getEyePasswordIcon() {
    return cy.get(icharterSelectors.signInPage.eyePasswordIcon);
  }

  getResetPassComponent() {
    return cy.get(icharterSelectors.signInPage.resetPasswordComponent);
  }

  getForgotPassword() {
    return cy.get(icharterSelectors.signInPage.forgotPassword);
  }

  getForgotPassEmailInput() {
    return cy.get(icharterSelectors.signInPage.forgotPassEmailInput);
  }

  getSixDigitCode() {
    return cy.get(icharterSelectors.signInPage.sixDigitCodeInput);
  }

  getNewPasswordInput() {
    return cy.get(icharterSelectors.signInPage.newPasswordInput);
  }

  getConfirmNewPassInput() {
    return cy.get(icharterSelectors.signInPage.confirmNewPasswordInput);
  }

  getResetPassButton() {
    return cy.get(icharterSelectors.signInPage.resetYourPassBtn);
  }

  getInvalidCodeMessage() {
    return cy.get(icharterSelectors.signInPage.invalidCodeMessage);
  }

  getInvalidEmailText() {
    return cy.get(icharterSelectors.signInPage.invalidEmailText);
  }

  getLoginButton() {
    return cy.get(icharterSelectors.signInPage.loginButton);
  }

  getCreateAccButton() {
    return cy.get(icharterSelectors.signInPage.createAccButton);
  }

  getInccorectCredText() {
    return cy.get(icharterSelectors.signInPage.incorrectCredentialsText);
  }

  // captain locators

  getWelcomeDiv() {
    return cy.get(icharterSelectors.captainDashboard.welcomeDiv);
  }

  getICharterLogo() {
    return cy.get(icharterSelectors.captainDashboard.iCharterLogo);
  }

  getDashboardButton() {
    return cy.get(icharterSelectors.captainDashboard.dashboardButton);
  }

  getListingsButton() {
    return cy.get(icharterSelectors.captainDashboard.listingsButton);
  }

  getBookingButton() {
    return cy.get(icharterSelectors.captainDashboard.bookingsButton);
  }

  getReviewButton() {
    return cy.get(icharterSelectors.captainDashboard.reviewsButton);
  }

  getEarningsButton() {
    return cy.get(icharterSelectors.captainDashboard.earningsButton);
  }

  getCaptainAvatar() {
    return cy.get(icharterSelectors.captainDashboard.accountAvatar);
  }

  getCreateListingButton() {
    return cy.get(icharterSelectors.captainDashboard.createListingButton);
  }

  getListingsTableWhole() {
    return cy.get(icharterSelectors.captainDashboard.listingsTableWhole);
  }

  getTableRowListings() {
    return cy.get(icharterSelectors.captainDashboard.tableRowListings);
  }

  // listing market

  getFirstListing() {
    return cy.get(icharterSelectors.listingsMarket.firstListing);
  }

  getSecondListing() {
    return cy.get(icharterSelectors.listingsMarket.secondListing);
  }

  getSortingDropdown() {
    return cy.get(icharterSelectors.listingsMarket.sortDropdown);
  }

  getCheckAvailability() {
    return cy.get(
      icharterSelectors.listingsMarket.listingDetails.checkAvailabilityButton);
  }

  getNextMonthArrowBtn() {
    return cy.get(
      icharterSelectors.listingsMarket.listingDetails.nextMonthArrow);
  }

  getCalendarSunday() {
    return cy.get(
      icharterSelectors.listingsMarket.listingDetails.sundayCalendar
    );
  }

  getApplyButton() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.applyButton);
  }

  getBookButton() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.bookButton);
  }

  getMobileNumber() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.mobileNumberDetails);
  }

  getZipCode() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.zipCodeDetails);
  }

  getNextDetailsBtn() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.nextButtonBookingDetails);
  }

  getCreditCardInput() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.creditCardInput);
  }

  getExpirationDate() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.expirationDate);
  }

  getCvvCode() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.cvvCode);
  }

  getNextButtonConfirmation() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.nextButtonBookingConfirmation);
  }

  getMapOption() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.mapOption);
  }

  getMapLocationFlorida() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.mapLocationFlorida);
  }

  getFullListingsList() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.fullListingsList);
  }

  getListingsLocation() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.listingsLocation);
  }

  getCaptainProfileCheck() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.captainProfileCheck);
  }

  getCaptainLocation() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.captainLocation);
  }

  getListingsDropdown() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.locationDropdown);
  }

  getLocationList() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.locationList);
  }

// filters

  getNoExperienceText() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.noExperienceText);
  }

  getBidFilter() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.bidFilter);
  }

  getOpenDepartureTime() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.departureTime.openDepartureTime);
  }

  getDepartureMorning() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.departureTime.morningDeparture);
  }

  getDepartureAfternoon() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.departureTime.afternoonDeparture);
  }

  getDepartureEvening() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.departureTime.eveningDeparture);
  }

  getOpenDuration() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripDuration.openTripDuration);
  }

  getTwoHrs() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripDuration.twoHrs);
  }

  getFourHrs() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripDuration.fourHrs);
  }

  getSixHrs() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripDuration.sixHrs);
  }

  getEightHrs() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripDuration.eightHrs);
  }

  getOpenSeason() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripSeason.openTripSeason);
  }

  getWinterSeason() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.tripSeason.winterSeason);
  }

  getOpenPrice() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.price.openPrice);
  }

  getToFourHundred() {
    return cy.get(icharterSelectors.listingsMarket.listingDetails.filters.price.toFourHundred);
  }

// captain profile

getCaptainLogOutBtn() {
  return cy.get(icharterSelectors.captainDashboard.logOutButton);
}

getCaptainMyAccBtn() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.myAccButton);
}

getCaptainProfilePic() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.profilePic);
}

getCaptainCompanyInput() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.companyNameInput);
}

getCaptainNameInput() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.captainNameInput);
}

getCaptainPhoneNoInput() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.phoneNoInput);
}

getCaptainLocationInput() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.locationInput);
}

getCaptainDeleteLicenceBtn() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.deleteLicenceButton);
}

getCaptainMasterLicenceClick() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.masterLicenceClick);
}

getCaptainYearsOfExpInput() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.yearsOfExpInput);
}

getCaptainNationalityDropdown() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.nationalityDropdown);
}

getCaptainNationalityDropdownValue() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.nationalityDropdownValue);
}

getCaptainVeteranCheck() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.veteranCheck);
}

getCaptainActiveMilitaryCheck() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.activeMilitaryCheck);
}

getCaptainFirstResponderCheck() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.firstResponderCheck);
}

getCaptainMinorityBusinessCheck() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.minorityBusinessCheck);
}

getCaptainInstagramSocials() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.instagramSocials);
}

getCaptainFacebookSocials() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.facebookSocials);
}

getCaptainTikTokSocials() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.tikTokSocials);
}

getCaptainYelpSocials() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.yelpSocials);
}

getCaptainDeletePhotos() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.deletePhotos);
}

getCaptainPhotosAndVideosUpload() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.photosVideosClick);
}

getCaptainPhotosPreview() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.photosPreview);
}

getCaptainSaveBtn() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.saveButton);
}

getDeleteCaptainAccount() {
  return cy.get(icharterSelectors.captainDashboard.captainProfile.deleteCaptainAccount);
}

// listing steps

getExperienceName() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.experienceName);
}

getFishingCharterExp() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.fishingCharerExp);
}

getToursExp() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.toursExp);
}

getExpDescription() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.experienceDescription);
}

getSelectCaptain() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.selectCaptain);
}

getDragAndDropPics() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.dragAndDropPictures);
}

getNextButton() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepOne.nextButton);
}

// step two

getSpeciesInput() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepTwo.speciesInput);
}

getFishingTechniques() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepTwo.fishingTechniques);
}

getIncludedInPrice(): Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepTwo.includedInPrice);
}

// step three

getBoatType() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.boatType);
}

getBoatDescription() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.boatDescription);
}

getIncrementGuestNumber() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.incrementGuestNumber);
}

getDuration() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.duration);
}

getDepartureTimeHour() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.departureTimeHour);
}

getDepartureTimeMinute() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.departureTimeMinute);
}

getAvailability(){
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.availability);
}

getSeasonalExp() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.seasonalExperience);
}

getFacilities(){
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepThree.facilities);
}

// step four

getStreetAddressInput() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFour.streetAddressInput);
}

getDirectionsInput() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFour.directionsInput);
}

getNextButtonStepFour() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFour.nextButtonStepFour);
}

// step five

getPrivateModel() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.privateModel);
}

getPublicModel() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.publicModel);
}

getBidInput() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.bidInput);
}

getSpecialDiscountInput() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.specialDicountInput);
}

getSpecialDiscountSingleValue() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.specialDiscountSingleValue);
}

getPaymentMethodChecks(){
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.paymentMethodChecks);
}

getCancelDescription() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.cancelationDescription);
}

getICharterBidDescription() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.iCharterBidDescription);
}

getICharterBidCheck() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.iCharterBidCheck);
}

getPublishButton() {
  return cy.get(icharterSelectors.captainDashboard.listingStepsSelectors.stepFive.publishButton);
}

// listings table buttons

getListingsTable() {
  return cy.get(icharterSelectors.captainDashboard.listingsTableButtons.listingsTable);
}

getEditListing() {
  return cy.get(icharterSelectors.captainDashboard.listingsTableButtons.listingEditButton);
}

getPublishToggle() {
  return cy.get(icharterSelectors.captainDashboard.listingsTableButtons.publishToggle);
}

getDuplicateTrip() {
  return cy.get(icharterSelectors.captainDashboard.listingsTableButtons.duplicateTrip);
}

getDeleteTrip() {
  return cy.get(icharterSelectors.captainDashboard.listingsTableButtons.deleteTrip);
}

// customer profile
getCustomerAvatar() {
  return cy.get(icharterSelectors.customerProfile.customerAvatar);
}

getCustomerMyAccBtn() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.myAccBtnCustomer);
}

getCustomerName() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.customerName);
}

getCustomerSurame() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.customerSurname);
}

getCustomerEmail() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.customerEmail);
}

getCustomerPassword() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.customerPassword);
}

getDeleteCystiner() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.customerDeleteAcc);
}

getSaveButtonCustomer() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.saveButton);
}

getDeleteCustomer() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.deleteCustomer);
}

getDeleteWindow() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.deleteWindow);
}

getEnterPassForCustomerDelAcc() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.enterPassForDelAcc);
}

getDeleteAccBtn() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.deleteAccBtn);
}

getCancelDelAcc() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.cancelDeleteAcc);
}

getLogoutCustomer() {
  return cy.get(icharterSelectors.customerProfile.customerProfile.logoutCustomer);
}

}

export default PageObjects;
