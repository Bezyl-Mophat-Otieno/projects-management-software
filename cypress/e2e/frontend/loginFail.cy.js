describe('Testing the login page ',()=>{
    it('should actually login the user when the page login is clicked ',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','1245')
        setTimeout(()=>{
            cy.get('.alerts').should('equal','login failed , invalid credentials')
        },2000)
    })
 
})