/// <reference types="cypress"/>

context("vai para o dashboard de disciplina", () => {

  it("clica no botao da disciplina", () => {
    cy.get('#pr_id_7-table > tbody > tr:nth-child(1) > td:nth-child(6) > button').wait(500).click()
  } )

  it("verifica disciplina", () => {
    cy.get('.font-normal > :nth-child(2)').contains("Nome: Analise de Algoritmos")
  })
})

context("aplica filtro", () => {
  it("clica no botao de filtros", () => {
    cy.get('.mat-expansion-panel-header-title').click()
    cy.get('#selectperiodoDisciplinas').click()
    cy.get('mat-option[id="periodo-checkbox-option-2018.2"]').click()
    cy.get('.cdk-overlay-backdrop').click()
    cy.get('#cdk-accordion-child-1 > div > div > button').click()
  })

  it("verifica disciplina", () => {
    cy.get('.font-normal > :nth-child(2)').contains("Nome: Analise de Algoritmos")
  })
})
