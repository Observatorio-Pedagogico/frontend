/// <reference types="cypress"/>

// context("Teste de borda Login", () => {
//   it("Campo email errado", () => {
//     cy.visit("/login")
//     cy.get('[type="password"]').type('123456')
//     cy.get('button').click()
//     cy.contains('Tabela de Extrações SUAP')
//   })

//   it("campo senha errado", () => {
//     cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
//     cy.get('[type="password"]').clear()
//     cy.get('button').click()
//     cy.contains('Tabela de Extrações SUAP')
//   } )

//   it("campos vazios", () => {
//     cy.get('[type="email"]').clear()
//     cy.get('[type="password"]').clear()
//     cy.get('button').click()
//     cy.contains('Tabela de Extrações SUAP')
//   } )

//   it("Usuario logado com sucesso", () => {
//     cy.visit("/login")
//     cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
//     cy.get('[type="password"]').type('123456')
//     cy.get('button').click()
//     cy.contains('Tabela de Extrações SUAP')
//   } )
// });

// context("Teste de usuario na fila", () => {
//   it("cadastra outro usuario coped", () => {
//     cy.visit("/login")
//     cy.get('.mat-list-item-content').click()
//     cy.get('#matricula').type("201915020008")
//     cy.get('#email').type("thauan.amorim@academico.ifpb.edu.br")
//     cy.get('#senha').type("123456")
//     cy.get('#nome').type("Thauan Amorim")
//     cy.get('#sexo').select("MASCULINO")
//     cy.get('#tipo').select("COPED")
//     cy.get('.submit-button').click()
//     cy.get('[type="button"]').click()

//   })

//   it("Usuario logado com sucesso", () => {
//     cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br')
//     cy.get('[type="password"]').type('123456')
//     cy.get('button').click()
//     cy.contains('Tabela de Extrações SUAP')
//   } )

//   it("desloga",()=>{
//     cy.get('.item-menu-icon > .mat-icon').click()
//     cy.get('.mat-list-item-content > .mat-icon').click()
//   })

//   it("cadastra outro usuario coped", () => {
//     cy.visit("/login")
//     cy.get('.mat-list-item-content').click()
//     cy.get('#matricula').type("201915020008")
//     cy.get('#email').type("usuario2@academico.ifpb.edu.br")
//     cy.get('#senha').type("123456")
//     cy.get('#nome').type("usuario dois")
//     cy.get('#sexo').select("MASCULINO")
//     cy.get('#tipo').select("COPED")
//     cy.get('.submit-button').click()
//     cy.get('[type="button"]').click()
//   })

//   it("Usuario logado com sucesso", () => {
//     cy.get('[type="email"]').type('usuario2@academico.ifpb.edu.br')
//     cy.get('[type="password"]').type('123456')
//     cy.get('button').click()
//     cy.wait("@dataGetFirst").its("state").should("be",403)
//   } )
// });

