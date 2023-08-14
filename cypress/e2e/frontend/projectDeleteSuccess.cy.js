

describe('Testing the Deletion Functionality', () => {
    it('should make sure the project is deleted successfully',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList ').children('.projectContainer')
        .find('h3:contains("Test_Project")').first().parent('.projectContainer').find('.actions')
        .find('.action-btn-delete').click()
        cy.get('.alerts').should('be.visible')
    })
    it('should make sure the project is deleted from the dom',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList ').children('.projectContainer')
        .find('h3:contains("Test_Project")').first().parent('.projectContainer').find('.actions')
        .find('.action-btn-delete').click()
        cy.get('.alerts').should('be.visible')
        setTimeout(()=>{
            cy.get('.alerts').should('not.exist')
        },4000)
        cy.get('.projectList ').children('.projectContainer')
        .find('h3:contains("Test From Cypress")').should('not.exist')

       
        
    })
    
});
