describe('Testing Registration', () => {
    it('should register a user and navigate to login',  () => {
        cy.visit('/authentication/register/register.html')
        cy.register('temo@gmail.com','temo','12345','12345')
        setTimeout(()=>{
            cy.get('.alerts').should('contain','User registered successfully')
        },2000
        ) 
    });


});
