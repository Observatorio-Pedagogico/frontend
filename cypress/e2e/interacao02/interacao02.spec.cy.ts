/// <reference types="cypress"/>

context("Teste de borda Login", () => {
  it("Campo email errado", () => {
    cy.visit("localhost:4200/login")
    cy.get('[type="password"]').type('123456')
    cy.get('button').click()
    cy.contains('Tabela de Extrações SUAP')
  })

  it("campo senha errado", () => {
    cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
    cy.get('[type="password"]').clear()
    cy.get('button').click()
    cy.contains('Tabela de Extrações SUAP')
  } )

  it("campos vazios", () => {
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('button').click()
    cy.contains('Tabela de Extrações SUAP')
  } )

  it("Usuario logado com sucesso", () => {
    cy.visit("localhost:4200/login")
    cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
    cy.get('[type="password"]').type('123456')
    cy.get('button').click()
    cy.contains('Tabela de Extrações SUAP')
  } )
})

