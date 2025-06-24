import { delay } from "cypress/types/bluebird";
import testData from "../testData.json";
import PageObjects from "../../pages/iCharter-pages";

const pageObjects = new PageObjects();

class SignUpSteps {

    signUpCustomer(firstName: string, lastName: string, email: string, password: string, repeatPass: string){
        cy.wait(1500);
        pageObjects.getSignIn().should("be.visible");
        pageObjects.getSignUp().click();
        cy.wait(1000);
        pageObjects.getCustomerUserIcon().click();
        pageObjects.getSignUpFirstName().should("be.visible");
        pageObjects.getSignUpFirstName().should("be.empty");
        pageObjects.getSignUpFirstName().type(firstName);
        pageObjects.getSignUpLastName().type(lastName);
        pageObjects.getSignUpEmailInput().type(email);
        pageObjects.getSignUpPasswordInput().type(password);
        pageObjects.getSignUpRepeatPasswordInput().type(repeatPass);
        cy.wait(1500);
        // pageObjects.getCreateAccBtn().click();
        // cy.wait(1500);
        // cy.visit('https://yopmail.com');
        // cy.origin('https://yopmail.com', () => {
        //     cy.get('.tooltip.click > input').type('qaichcust');
        //     cy.get('button[title=\'Check Inbox @yopmail.com\']').click();
        //     cy.get('tbody tr td p code').type('{selectall}{ctrl}c');        
        // });
        // cy.go('back');
        // cy.go('back');
    
    }
    
    signUpCharter(firstName: string, lastName: string, email: string, password: string, repeatPass: string){
        cy.wait(1500);
        pageObjects.getSignIn().should("be.visible");
        pageObjects.getSignUp().click();
        cy.wait(1000);
        pageObjects.getCharterUserIcon().click();
        pageObjects.getSignUpFirstName().should("be.visible");
        pageObjects.getSignUpFirstName().should("be.empty");
        pageObjects.getSignUpFirstName().type(firstName);
        pageObjects.getSignUpLastName().type(lastName);
        pageObjects.getSignUpEmailInput().type(email);
        pageObjects.getSignUpPasswordInput().type(password);
        pageObjects.getSignUpRepeatPasswordInput().type(repeatPass);
        // pageObjects.getCreateAccBtn().click();

    }

    existingEmailCheck(){
        pageObjects.getExistingMailText().should('be.visible');
    }

    weakPasswordCheck(){
        cy.wait(800);
        pageObjects.getSignUpPasswordInput().should('have.css', 'border-color', 'rgb(239, 68, 68)');
    }

}

export default new SignUpSteps();