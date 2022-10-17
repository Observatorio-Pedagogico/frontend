/// <reference types="cypress"/>


context("Voltar para extracoes", () => {
  it("De volta as extracoes", () => {
    cy.get('button[(click)="voltarButtonEvent()]').click()
  } )
} )
