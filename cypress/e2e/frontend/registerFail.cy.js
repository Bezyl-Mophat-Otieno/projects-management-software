describe('Testing Registration', () => {
    it('should register a user and navigate to login',  () => {
        cy.visit('/authentication/register/register.html')
        cy.register('djhjgdhjSGSGkw@gmail.com','fdghv','12345','12345')
        setTimeout(()=>{
            cy.get('.alerts').should('equal','User already exists')
        },2000
        ) 
    });
  
});
