
describe('Testing the users dashboard', () => {

    beforeEach(() => {
        cy.visit('/authentication/login/login.html')
        cy.login('bezylmophatotieno@gmail.com', '12345')
    })
    it('should make sure the dashboard actually exists', () => {
        cy.location('pathname').should('equal','/Full-Stack/frontend/user-dashboard/index.html')
        
    })
   it('should make sure the profile section is working', () => {
        cy.get('.profile .profileImg img').should('be.visible')
    })
    it('should make sure the about section is working', () => {
        cy.get('.profileName').should('have.text','mophat')

    })
 
    
});
