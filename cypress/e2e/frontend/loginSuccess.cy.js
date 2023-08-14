describe('Testing the login page ',()=>{
    it('should actually login the user when the page login is clicked ',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        setTimeout(()=>{
            cy.get('.alerts').should('equal','login successful')
        },2000)
    })
 
})