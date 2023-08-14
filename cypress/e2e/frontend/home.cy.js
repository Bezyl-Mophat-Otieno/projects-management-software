///<reference types="cypress" />
describe('Testing The Home Page',() => {

  beforeEach(()=>{
    cy.visit('/landing-page/home/index.html')
  })



    it('should navigate to login page on login button click ', () => {
      cy.toLogin()
      cy.location('pathname').should('equal','/Full-Stack/frontend/authentication/login/login.html')
      cy.go('back')
      cy.location('pathname').should('equal','/Full-Stack/frontend/landing-page/home/index.html')
      cy.go('forward')
      cy.location('pathname').should('equal','/Full-Stack/frontend/authentication/login/login.html')
    })
    it('should navigate to register on button click ', () => {
      cy.toRegister()
      cy.location('pathname').should('equal','/Full-Stack/frontend/authentication/register/register.html')
      cy.go('back')
      cy.location('pathname').should('equal','/Full-Stack/frontend/landing-page/home/index.html')
      cy.go('forward')
      cy.location('pathname').should('equal','/Full-Stack/frontend/authentication/register/register.html')

    })
    
});
