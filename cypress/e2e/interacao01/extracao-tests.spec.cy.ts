/// <reference types="cypress"/>

context("Loga na aplicacao", () => {
  it("cadastra outro usuario coped", () => {
    cy.visit("/login").wait(1000)
    cy.get('body > app-root > app-login > div > div > form > a').click()
    cy.get('#matricula').type("201915020008")
    cy.get('#email').type("thauan.amorim@academico.ifpb.edu.br")
    cy.get('#senha').type("123456")
    cy.get('#nome').type("Thauan Amorim")
    cy.get('#sexo').select("MASCULINO")
    cy.get('#tipo').select("COPED")
    cy.get('.submit-button').click()
    cy.get('[type="button"]').click()
  })
  it("Usuario logado com sucesso", () => {
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
  let titulo = "testando envio";
  it("validando campo titulo", () => {
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

  it("validando campo descricao", () => {
    cy.get('input[formControlName="titulo"]').type(titulo)
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
  })

  it("volta para a tela de extrações cadastradas", () => {
    cy.get('body > app-root > app-cadastro-extracao > form > div > button:nth-child(1)').click();
    cy.get('#pr_id_4-table > tbody > tr > td:nth-child(2)').contains("testando envio")
  })
})
