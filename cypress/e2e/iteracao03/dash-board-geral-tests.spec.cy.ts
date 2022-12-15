/// <reference types="cypress"/>

// context("Loga na aplicacao", () => {
//   it("Usuario logado com sucesso", () => {
//     cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
//     cy.get('[type="password"]').type('123456')
//     cy.get('button').click()
//     cy.contains('Tabela de Extrações SUAP')
//   } )
// })

context("vai para o dashboard", () => {
  it("clica nos botoes", () => {
    cy.wait(30000).get('.item-menu-icon > .mat-icon').click()
    cy.get('.h-full > .gap-4 > :nth-child(1)').click()
  })

  it("Aplica filtro", () => {
    cy.get('#mat-expansion-panel-header-0').click()
    cy.get('#selectperiodo').click()
    cy.get('#mat-option-4 > .mat-pseudo-checkbox').click()
    cy.get('.cdk-overlay-backdrop').click()
  })

  it("verifica se contem o periodo especifico", () => {
    cy.get('.grid > .p-2').click().wait(800)
    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(5)').then(function(e) {
      const t = e.text()
      expect(t).to.contains(' 2018.1 ')
    })
  })
})
