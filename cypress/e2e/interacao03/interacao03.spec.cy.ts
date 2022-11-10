/// <reference types="cypress"/>

context("Cadastra e Loga na aplicacao", () => {
  it("cadastra usuario com sucesso", () => {
    cy.visit("localhost:4200/login")
    cy.get('.mat-list-item-content').click()
    cy.get('#matricula').type("201915020008")
    cy.get('#email').type("thauan.amorim@academico.ifpb.edu.br")
    cy.get('#senha').type("123456")
    cy.get('#nome').type("Thauan Amorim")
    cy.get('#sexo').select("MASCULINO")
    cy.get('#tipo').select("COPED")
    cy.get('.submit-button').click()
    cy.get('[type="button"]').click()
  } )

  it("Usuario logado com sucesso", () => {
    cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
    cy.get('[type="password"]').type('123456')
    cy.get('button').click()
    cy.contains('Tabela de Extrações SUAP')
  } )
})

context("vai para o dashboard", () => {
  it("clica nos botoes", () => {
    cy.get('.item-menu-icon > .mat-icon').click()
    cy.get('.h-full > .gap-4 > :nth-child(1)').click()
  })

  it("Aplica filtro", () => {
    cy.get('#mat-expansion-panel-header-0').click()
    cy.get('.mat-form-field.ng-tns-c90-15 > .mat-form-field-wrapper > .mat-form-field-flex').click()
    cy.get('#mat-option-4 > .mat-pseudo-checkbox').click()
    cy.get('.cdk-overlay-backdrop').click()
  })

  it("verifica se contem o periodo especifico", () => {
    cy.get('.grid > .p-2').click().wait(500)
    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(5)').then(function(e) {
      const t = e.text()
      expect(t).to.contains(' 2018.1 ')
    })
  })
})
