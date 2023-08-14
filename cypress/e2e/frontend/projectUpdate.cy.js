

describe('Updating the projects', () => {
    


    it('should make sure when a project is clicked its details are filled in the form',()=>{

        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList').children('.projectContainer').children('.actions').find('.action-btn-update')
        .first().click()
       
      
        cy.get('.form-group').children().each(($el)=>{
            cy.wrap($el).should('not.have.value','')
        })
    })
    it('should make sure the project is updated successfully',()=>{

        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList').children('.projectContainer').children('.actions').find('.action-btn-update')
        .first().click()
       
      
        cy.updateProject('Test From Cypress','Test Description From Cypress')
        cy.get('.alerts:contains("Project updated successfully")').should('be.visible')

    })

    it('should make sure the alert disapears after 4 seconds',()=>{
       
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList').children('.projectContainer').children('.actions').find('.action-btn-update')
        .first().click()
        cy.updateProject('Test From Cypress','Test Description From Cypress')
        cy.get('.alerts:contains("Project updated successfully")').should('be.visible')
        setTimeout(()=>{
            cy.get('.alerts').should('not.exist')
        },4000)
    })

    it('it should make sure the form is cleared on update',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList').children('.projectContainer').children('.actions').find('.action-btn-update')
        .first().click()
        cy.updateProject('Test From Cypress','Test Description From Cypress')
        cy.get('.form-group').children().each(($input)=>{
            cy.wrap($input).should('have.value','')
        })

    })
    it('Make sure the updated project appears on the DOM',()=>{

        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.get('.projectList').children('.projectContainer').children('.actions').find('.action-btn-update')
        .first().click()
        cy.updateProject('Test From Cypress','Test Description From Cypress')
        cy.get('.projectList').children('.projectContainer').children('h3:contains("Test From Cypress")').should('be.visible')


    })


});
