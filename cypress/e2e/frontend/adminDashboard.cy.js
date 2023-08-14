
describe('Testing the users dashboard', () => {

    beforeEach(() => {
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com', '12345')
    })
   it('should make sure the dashboard actually exists', () => {
    cy.location('pathname').should('equal','/Full-Stack/frontend/admin-dashboard/index.html')
    })
    it('should make sure the admin can navigate to view users on btn click',()=>{
        cy.get('#allUsers').click()
        cy.location('pathname').should('equal','/Full-Stack/frontend/admin-dashboard/users/index.html')
    })
    it('should make sure the admin can view incomplete projects on btn click',()=>{
        cy.get('#incompleted').click()
        cy.location('pathname').should('equal','/Full-Stack/frontend/admin-dashboard/index.html')   
    })

    it('should make sure the admin can view completed projects on btn click',()=>{
        cy.get('#completed').click()
        cy.location('pathname').should('equal','/Full-Stack/frontend/admin-dashboard/index.html')   
    })



    
});
