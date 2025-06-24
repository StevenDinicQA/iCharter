// /// <reference types="Cypress" />
// import "cypress-file-upload";
// import { generateRandomEmail } from "./randomEmail";

// Cypress.Commands.add("mobileWebSetupAndLogin", (username, password) => {
//   cy.viewport("iphone-se2"); // Set viewport to 375 x 667
//   cy.wait(10000);
//   // Go to login page
//   cy.goLoginPage();
//   cy.wait(10000);
//   // User login
//   cy.userLogin(`${username}`, `${password}`);
//   cy.wait(10000);
// });

// Cypress.Commands.add("goLoginPage", () => {
//   // Go to the login page
//   cy.visit("/auth/sign-in");
//   cy.url().should((url) => {
//     expect(url, 'Navigate to the website "/auth/sign-in').to.include(
//       "/auth/sign-in"
//     );
//   });
// });

// Cypress.Commands.add("checkHomepage", () => {
//   // Go to the login page
//   cy.visit("/");
//   cy.url().should((url) => {
//     expect(url, 'Navigate to the website "/').to.include("/");
//   });
//   cy.wait(10000);
//   cy.checkText("Choose your next memory");
//   cy.wait(10000);
//   cy.scrollTo("bottom");
//   cy.wait(10000);
//   cy.checkGetCss(".swiper-initialized");
// });

// Cypress.Commands.add("userLogin", (username, password) => {
//   // Check for the presence of the email input field and type email address
//   cy.wait(10000);
//   cy.get("[test-id='signin_email']")
//     .should(($usernameInput) => {
//       expect($usernameInput, "Check for the presence of the email input field")
//         .to.exist;
//     })
//     .type(`${username}`);
//   cy.wait(10000);
//   // Check for the presence of the password input field and type password
//   cy.get("[test-id='signin_password']")
//     .should(($passwordInput) => {
//       expect(
//         $passwordInput,
//         "Check for the presence of the password input field"
//       ).to.exist;
//     })
//     .type(`${password}`);
//   cy.wait(10000);
//   // Check for the presence of the Sign In button and click
//   cy.get("[test-id='signin_login']")
//     .should(($loginButton) => {
//       expect($loginButton, "Check for the presence of the Sign In button").to
//         .exist;
//     })
//     .click();
//   cy.wait(10000);
// });

// Cypress.Commands.add("checkText", (containsText) => {
//   cy.wait(10000);
//   cy.contains(`${containsText}`).should(($usernameInput) => {
//     expect($usernameInput, "Check for the presence of the text").to.exist;
//   });
// });

// Cypress.Commands.add("checkGetCss", (getCss) => {
//   cy.get(`${getCss}`).should(($getCssInput) => {
//     expect($getCssInput, "Check for the presence of the email input field").to
//       .exist;
//   });
// });

// Cypress.Commands.add("userLogout", () => {
//   cy.wait(10000);
//   cy.get("[data-testid='MenuIcon']")
//     .should(($menuIcon) => {
//       expect($menuIcon, "Check for the presence of the hamburger menu button")
//         .to.exist;
//     })
//     .click();
//   cy.wait(10000);
//   cy.get("[data-testid='LogoutIcon']")
//     .should(($logoutIcon) => {
//       expect($logoutIcon, "Check for the presence of the Logout button").to
//         .exist;
//     })
//     .click();
//   cy.wait(10000);
//   cy.checkText("Choose your next memory");
// });

// Cypress.Commands.add("getCharterProfile", () => {
//   cy.get("[data-testid='MenuIcon']")
//     .should(($menuIcon) => {
//       expect($menuIcon, "Check for the presence of the hamburger menu button")
//         .to.exist;
//     })
//     .click();
//   cy.wait(10000);
//   cy.get("[data-testid='PersonOutlineOutlinedIcon']")
//     .should(($myAccount) => {
//       expect($myAccount, "Check for the presence of the My Account button").to
//         .exist;
//     })
//     .click();
//   cy.wait(2000);
//   cy.contains("Charter Profile")
//     .should(($charterProfile) => {
//       expect(
//         $charterProfile,
//         "Check for the presence of the Charter Profile button"
//       ).to.exist;
//     })
//     .click();
//   cy.wait(10000);
//   cy.get('input[placeholder*="Company name"]')
//     .should(($companyName) => {
//       expect($companyName, "Check for the presence of the Company Name input")
//         .to.exist;
//     })
//     .clear()
//     .type("Test");
// });

// Cypress.Commands.add("editCompanyName", () => {
//   cy.wait(2000);
//   cy.get("input[placeholder='Company name']")
//     .should(($companyName) => {
//       expect($companyName, "Check for the presence of the Company Name input")
//         .to.exist;
//     })
//     .clear()
//     .type("Test Edit");
//   cy.wait(2000);
//   cy.contains("Save")
//     .should(($companyName) => {
//       expect($companyName, "Check if the save button is active").to
//         .exist;
//     })
//     .click();
// });

// Cypress.Commands.add("getNotificationsPage", () => {
//   // Check for the presence of the email input field and type email address
//   cy.get("[data-testid='MenuIcon']")
//     .should(($menuIcon) => {
//       expect($menuIcon, "Check for the presence of the hamburger menu button")
//         .to.exist;
//     })
//     .click();
//   cy.wait(5000);
//   cy.get("[data-testid='PersonOutlineOutlinedIcon']")
//     .should(($myAccount) => {
//       expect($myAccount, "Check for the presence of the My Account button").to
//         .exist;
//     })
//     .click();
//   cy.wait(5000);
//   cy.contains("Notifications")
//     .should(($notifications) => {
//       expect(
//         $notifications,
//         "Check for the presence of the Notifications button"
//       ).to.exist;
//     })
//     .click();
//   cy.wait(5000);
//   cy.checkText("Account Activity and Updates");
//   cy.wait(5000);
//   cy.checkText("Reminders");
//   cy.wait(5000);
//   cy.checkText("Promotion and Tips");
// });

// Cypress.Commands.add("uploadImage", () => {
//   cy.get("#drag-n-drop")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile("518.png", { subjectType: "drag-n-drop" });
//   cy.wait(5000);
//   cy.get("#drag-n-drop")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile("561.png", { subjectType: "drag-n-drop" });
//   cy.wait(5000);
//   cy.get("#drag-n-drop")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile("574.png", { subjectType: "drag-n-drop" });
//   cy.wait(5000);
//   cy.get("#drag-n-drop")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile("1.png", { subjectType: "drag-n-drop" });
//   cy.wait(5000);
//   cy.get("#drag-n-drop")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile("2.png", { subjectType: "drag-n-drop" });
//   cy.wait(5000);
// });

// Cypress.Commands.add("createListingsPage1", () => {
//   cy.get('[data-testid="AddIcon"]').click()
//   cy.wait(30000)
//   cy.get("input[placeholder='Example: Full Day Fishing Trip']").type('Test Listing - Please, ignore!')
//   cy.get('#Vector').first().click({ force: true })
//   cy.get('textarea[test-id="description"]').type('Game of Fishing invites you to a professional Fishing Trips from Fethiye - Oludeniz, which is famous for its natural beauty at the intersection of the Southern Aegean and the Mediterranean coast. With Fethiye Fishing Charters you can catch Amberjack, Mahi Mahi, Tuna, Giant Squid, Red Snapper and many other local species. Check our guests previous caught fishs photos...')
//   cy.get("div[test-id='QA Captain']").click({ force: true })
//   cy.uploadImage()
//   cy.get("[type='button']").click({ force: true })
//   cy.wait(10000)
// });

// Cypress.Commands.add("createListingsPage2", () => {
//   cy.get('.css-1xc3v61-indicatorContainer').eq(0).click()
//   cy.contains('African lungfish').click({ force: true })
//   cy.get("[test-id='Light Tackle']").click({ force: true })
//   cy.get("[test-id='Lures']").click({ force: true })
//   cy.get("[type='button']").eq(1).click({ force: true })
//   cy.wait(10000)
// });

// Cypress.Commands.add("createListingsPage3", () => {
//   cy.get('#react-select-3-placeholder').click({ force: true })
//   cy.wait(5000)
//   cy.contains('Pontoon').first().click({ force: true })
//   cy.wait(5000)
//   cy.get("[class] [tabindex='0']:nth-child(3) [xmlns]").click({ force: true })
//   cy.get("textarea[test-id='boatDescription']").type('Extra comfortable seats, small table')
//   cy.get('#react-select-4-input').click({ force: true })
//   cy.contains('6 hours').click()
//   cy.get("input[type='number']").first().type('12')
//   cy.get("[test-id='Mon']").click({ force: true })
//   cy.get("[test-id='Tue']").click({ force: true })
//   cy.get("[test-id='Wed']").click({ force: true })
//   cy.get("[test-id='Thu']").click({ force: true })
//   cy.get("[test-id='Fri']").click({ force: true })
//   cy.get("[test-id='Sat']").click({ force: true })
//   cy.get("[test-id='Sun']").click({ force: true })
//   cy.get("[type='button']").click({ force: true })
//   cy.wait(10000)
// });

// Cypress.Commands.add("createListingsPage4", () => {
//   cy.get("input[placeholder='Enter Street Address']").type('Florida')
//   cy.wait(10000)
//   cy.contains('Florida').click()
//   cy.get("textarea[test-id='directions']").click().type('North')
//   cy.wait(10000)
//   cy.get("[type='button']").eq(7).click()
//   cy.wait(10000)
// });

// Cypress.Commands.add("createListingsPage5", () => {
//   cy.wait(10000)
//   cy.get("label[for='Private']").click()
//   cy.get("input[placeholder='Enter price']").type('100')
//   cy.get("[test-id='Cash']").click({ force: true })
//   cy.get("textarea[test-id='cancellation-rules']").type('Please do not cancel your trip')
//   cy.get("[type='button']").click()
//   cy.wait(30000)
//   cy.checkText("Test Listing");
//   cy.checkText("Incomplete");
// });

// Cypress.Commands.add("goSignUpPage", () => {
//   // Go to the login page
//   cy.visit("/auth/sign-up");
//   cy.url().should((url) => {
//     expect(url, 'Navigate to the website "/auth/sign-up').to.include(
//       "/auth/sign-up"
//     );
//   });
//   cy.wait(10000);
// });

// Cypress.Commands.add("placeiCharterBid", () => {
//   // Log-in with as a customer then Place an iCharterBid
//   cy.visit("/market");
//   cy.wait(30000)
//   cy.get("input[placeholder='Enter Bid']").type('900')
//   cy.wait(15000)
//   cy.get("path[d='M14.8409 4.62109L6.81174 12.6503L3.16211 9.00066']").eq(1).click({ force: true })
//   cy.wait(30000)
//   cy.get("input[test-id='signin_email']").type('qa+customer@oneseventech.com')
//   cy.wait(15000)
//   cy.get("input[test-id='signin_password']").type('Test123!*')
//   cy.wait(15000)
//   cy.get("button[test-id='signin_login']").click()
//   cy.wait(15000)
//   cy.get("path[d='M14.8409 4.62109L6.81174 12.6503L3.16211 9.00066']").eq(1).click({ force: true })
//   cy.wait(30000)
//   cy.contains('Bid to 5 Charters')//.click({ force: true })
//   cy.wait(15000)
// });

// Cypress.Commands.add("completeSignUpForm", () => {
//   const randomEmail = generateRandomEmail();
//   cy.wait(10000);
//   cy.get("input[placeholder='First name']").type("Hakan");
//   cy.wait(10000);
//   cy.get("input[placeholder='Last name']").type("Ersingun");
//   cy.wait(10000);
//   cy.get("input[placeholder='Enter Email Address']").type(randomEmail);
//   cy.wait(10000);
//   cy.get("[test-id='signup_password']").type("Test123!*");
//   cy.wait(10000);
//   cy.get("[test-id='signup_confirm-password']").type("Test123!*");
//   cy.wait(10000);
//   cy.get("[test-id='signup_create-account']").click();
//   cy.wait(10000);
//   cy.contains("Check your email").should(($Checkyouremail) => {
//     expect(
//       $Checkyouremail,
//       "Check for the presence of the Verification Code page"
//     ).to.exist;
//   });
//   cy.wait(11000);
// });

// Cypress.on("uncaught:exception", (err, runnable) => {
//   // returning false here prevents Cypress from
//   // failing the test
//   return false;
// });

// Cypress.Commands.add("uploadSingleFile", (fileName) => {
//   cy.get("#drag-n-drop")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile(`${fileName}`, { subjectType: "drag-n-drop" });
//   cy.wait(5000);
// });

// Cypress.Commands.add("uploadCharterProfilePic", (imgName) => {
//   cy.get("#avatar")
//     .invoke("removeClass", "file_input_hidden")
//     .attachFile(`${imgName}`, { subjectType: "input" });
// });

// Cypress.Commands.add("login", (username, password) => {
//   // Go to login page
//   cy.goLoginPage();
//   // User login
//   cy.userLogin(`${username}`, `${password}`);
//   cy.wait(10000);
// });

// Cypress.Commands.add("clickNextButton", () => {
//   cy.contains('Next')
//     .should(($nextButton) => {
//       expect($nextButton, 'Check for the presence of the next button')
//         .to.exist
//     }).click()
// });

// Cypress.Commands.add("signInCustomer", () => {
//   cy.webSetupAndLogin("qa+customer@oneseventech.com", "Test123!*")
// });

// Cypress.Commands.add("signInCharter", () => {
//   cy.webSetupAndLogin("qa+charter@oneseventech.com", "Test123!*")
// });

// Cypress.Commands.add("clickNextButtonTillPublishButton", () => {
// });

