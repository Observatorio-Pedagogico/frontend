/// <reference types="cypress"/>

context("Cadastra-se na aplicacao", () => {
  it("clicou no botao cadastrar-se", () => {
    cy.visit("localhost:4200")
    cy.wait(500).get('.mat-list-item-content').click()
  } )

  it("validando campo de matricula", () => {
    //cy.get('#matricula').type("201915020008")
    cy.get('#email').type("thauan.amorim@academico.ifpb.edu.br")
    cy.get('#senha').type("123456")
    cy.get('#nome').type("Thauan Amorim")
    cy.get('#sexo').select("MASCULINO")
    cy.get('#tipo').select("COPED")
    cy.get('[type="submit"]')
  } )
})
