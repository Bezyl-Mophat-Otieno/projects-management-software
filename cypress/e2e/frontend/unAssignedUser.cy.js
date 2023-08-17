//<reference types="cypress" />

describe('Testing the dashboard of a user yet to be assigned a project', () => {
    
    beforeEach(() => {
        cy.visit('/authentication/login/login.html')
        cy.login('otieno@gmail.com', '12345')
    })

     it('it should make sure a message is displayed if a project is yet to be assigned',()=>{
         cy.get('.projectContainer').children('h5').contains('Currently, you have no project assigned.')
     })
     it('should make sure the complete button is not clickable when you dont have a projects assigned',()=>{
        cy.get('.checkbox').each(($el)=>{
            cy.wrap($el).click()
        })
        cy.get('#completeBtn').should('have.css','pointer-events','none')


     })

});
