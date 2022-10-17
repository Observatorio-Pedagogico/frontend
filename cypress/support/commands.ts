/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add<any>("createOng", () => {
  cy.request({
    method: 'POST',
    url: 'localhost:8080/observatorio-pedagogico/api/login/cadastrar',
    body: {
      matricula: "201915020008",
      email: "teste@academico.ifpb.edu.br",
      senha: "123456",
      nome: "Test",
      sexo: "MASCULINO",
      tipo: "COPED",
    }
  }).then(response => {
    expect(response.body.data).is.not.null;
    cy.log(response.body.data);

    Cypress.env('createOngData', response.body.data)
    Cypress.env('createOngEmail', response.body.data.email)
    Cypress.env('createOngSenha', response.body.data.senha)
  });
})
