
describe('Testing The Project Add Functionality', () => {
    beforeEach(()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
    })
    it('Make sure the project can be added successfully', async() => {
        cy.addProject('Test_Project','Test_Repo','Test_Tech','Test_Url')
        cy.get('.alerts').should('be.visible')
    });

    it('should make sure the added project appears on the dom',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.addProject('Test_Project3','Test_Repo','Test_Tech','Test_Url')
        cy.get('.alerts').should('be.visible')
        cy.get('h3').should('contain','Test_Project3')

    })
    it('The alert should disappear after 3 seconds',()=>{
        cy.visit('/authentication/login/login.html')
        cy.login('admin@gmail.com','12345')
        cy.addProject('Test_Project4','Test_Repo','Test_Tech','Test_Url')
        cy.get('.alerts').should('be.visible')
        setTimeout(()=>{
            cy.get('.alerts').should('not.exist')
        },4000)
    })
    
    
});
