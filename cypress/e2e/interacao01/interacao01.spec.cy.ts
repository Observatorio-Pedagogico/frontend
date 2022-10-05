/// <reference types="cypress"/>


context("Login na aplicacao", () => {
  it("Usuario logado com sucesso", () => {
    cy.visit("localhost:4200/login")
    cy.get('input[formControlName="email"]').type('thauan.amorim@academico.ifpb.edu.br')
    cy.get('input[formControlName="senha"]').type('123456')
    cy.get('button').click()
  } )
} )

context("Nova Extração", () => {
  it("Ir à uma nova extracao", () => {
    cy.get('button[routerLink="nova-extracao"]').click()
  } )
} )

context("Cadastro Extracao", () => {
  it("Cadastrando uma nova extracao", () => {
    cy.get('input[formControlName="titulo"]').type('extracao teste')
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
    cy.get('textarea[formControlName="descricao"]').type('Extrações referentes as disciplinas de programação 1 e projeto 2, do semestre 2022.2 do curso de Análise e Desenvolvimento de Sistemas, campus monteiro, disciplina ministrada pela professora Renata.')
    cy.get('button[type="submit"]').click()


  } )
} )
