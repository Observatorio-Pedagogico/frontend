/// <reference types="cypress"/>

context("Login na aplicacao", () => {
  it("Usuario logado com sucesso", () => {
    cy.visit("localhost:4200/login")
    cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
    cy.get('[type="password"]').type('123456')
    cy.get('button').click()
    cy.contains('Tabela de Extrações SUAP')

  } )
})

context("Nova Extração", () => {
  it("Ir à uma nova extracao", () => {
    cy.get('button[routerLink="nova-extracao"]').click()
  } )
})

context("Cadastro Extracao", () => {
  it("validando campo titulo", () => {
    cy.get('input[formControlName="periodoLetivo"]').type('2022.2')
    cy.get('mat-select[formControlName="periodoLetivoTipo"]').click()
    cy.get('mat-option[value="SEMESTRE"]').click()
    cy.get('input[type="file"]')
      .selectFile(
        [
          'cypress/fixtures/7K_de_Analise_das_Disciplinas_-_ADS.xlsx',
          'cypress/fixtures/Teste Alunos.xlsx'
        ],
        {force: true})
    cy.get('textarea[formControlName="descricao"]').type('Extrações das disciplinas do semestre 2022.2 do curso de Análise e Desenvolvimento de Sistemas, disciplina ministrada pela professora Renata.')
    cy.get('button[type="submit"]').should('be.disabled');
  } )

  it("validando campo periodo letivo", () => {
    cy.get('input[formControlName="titulo"]').type('testando envio')
    cy.get('input[formControlName="periodoLetivo"]').clear()
    cy.get('button[type="submit"]').should('be.disabled');
  } )

  it("validando campo descricao", () => {
    cy.get('input[formControlName="periodoLetivo"]').type('2022.2')
    cy.get('textarea[formControlName="descricao"]').clear()
    cy.get('button[type="submit"]').should('be.disabled');
  } )

  it("validando campo files", () => {
    cy.get('textarea[formControlName="descricao"]').type('Extrações das disciplinas do semestre 2022.2 do curso de Análise e Desenvolvimento de Sistemas, disciplina ministrada pela professora Renata.')
    cy.get('.p-element.ng-star-inserted > .p-ripple').click()
    cy.get('button[type="submit"]').should('be.disabled');
  } )

  it("validando campo enviou", () => {
    cy.get('input[type="file"]')
      .selectFile(
        [
          'cypress/fixtures/7K_de_Analise_das_Disciplinas_-_ADS.xlsx',
          'cypress/fixtures/Teste Alunos.xlsx'
        ],
        {force: true})
    cy.get('button[type="submit"]').click();
  } )
})
