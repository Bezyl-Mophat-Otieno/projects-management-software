// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// a command that navigates one to the login page from the home page
Cypress.Commands.add('toLogin',()=>{
    cy.get('#login').click()
})
// A command that navigates one to the register page from the home page 
Cypress.Commands.add('toRegister',()=>{
    cy.get('#register').click()
})

// A command to login a user
Cypress.Commands.add('login',(email,password)=>{
    cy.get('.email').type(email)
    cy.get('.password').type(password)
    cy.get('.btn-primary').click()
})

// a command to register a user
Cypress.Commands.add('register',(email,username,password,password2)=>{
    cy.get('.email').type(email)
    cy.get('.username').type(username)
    cy.get('.password').type(password)
    cy.get('.password2').type(password2)
    cy.get('.btn-primary').click()
})

// A command to add a project 

Cypress.Commands.add('addProject',(project_name,project_description)=>{
    cy.get('#project_name').type(project_name)
    cy.get('#project_description').type(project_description)
    cy.get('.btn-primary').click()

})