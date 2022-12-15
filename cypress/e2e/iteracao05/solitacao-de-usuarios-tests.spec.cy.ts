/// <reference types="cypress"/>

context("desloga e cadastra usuarios e depois loga", () => {
    it("clica no botao de deslogar", () => {
        cy.get('.item-menu-icon > .mat-icon').click();
        cy.get('.mat-list-item-content > .mat-icon').click();
    });

    it("cadastra professor", () => {
        cy.get('body > app-root > app-login > div > div > form > a').click();
        cy.get('#matricula').type("201915020009");
        cy.get('#email').type("thauan.professor@academico.ifpb.edu.br");
        cy.get('#senha').type("123456");
        cy.get('#nome').type("Thauan professor");
        cy.get('#sexo').select("MASCULINO");
        cy.get('#tipo').select("PROFESSOR");
        cy.get('.submit-button').click();
    });

    it("cadastra outro usuario coped", () => {
        cy.get('body > app-root > app-login > div > div > form > a').click();
        cy.get('#matricula').type("201915020010");
        cy.get('#email').type("thauan.segundo@academico.ifpb.edu.br");
        cy.get('#senha').type("123456");
        cy.get('#nome').type("Thauan segundo");
        cy.get('#sexo').select("MASCULINO");
        cy.get('#tipo').select("COPED");
        cy.get('.submit-button').click();
    });

    it("Loga usuario admin", () => {
        cy.get('[type="email"]').type('thauan.amorim@academico.ifpb.edu.br');
        cy.get('[type="password"]').type('123456');
        cy.get('button').click();
        cy.contains('Tabela de Extrações SUAP');
    });
});

context("permite acesso de usuarios", () => {
    it("vai para o permite usuarios", () => {
        cy.get('.item-menu-icon > .mat-icon').click();
        cy.get(':nth-child(6) > .mat-list-item-content').click();
    });

    it("vai para o permite usuarios", () => {
        cy.get('#pr_id_4-table > .p-datatable-tbody > .p-element > :nth-child(5) > div.flex > .bg-green-500 > .mat-icon').click();
        cy.get('#pr_id_5-table > .p-datatable-tbody > .p-element > :nth-child(5) > div.flex > .bg-green-500 > .mat-icon').click();
    });

    it("verifica se os usuario foram ativados na tela de gerenciamento de usuarios", () => {
        cy.get('.item-menu-icon > .mat-icon').click()
        cy.get(':nth-child(5) > .mat-list-item-content').click()
        cy.get('.p-datatable-tbody > :nth-child(2) > :nth-child(3)').contains('thauan.segundo@academico.ifpb.edu.br')
        cy.get('#pr_id_9-table > .p-datatable-tbody > .p-element > :nth-child(3)').contains('thauan.professor@academico.ifpb.edu.br')
    });

    it("adicionas disciplina no professor", () => {
        cy.get('.mat-select-placeholder').click()
        cy.get('mat-option[id="TEC.0450"] > .mat-pseudo-checkbox').click()
        cy.get('mat-option[id="TEC.0470"] > .mat-pseudo-checkbox').click()
        cy.get('.cdk-overlay-backdrop').click()
        cy.get('.item-menu-icon > .mat-icon').click()
        cy.get('.mat-list-item-content > .mat-icon').click()
    });

    it("loga o professor", () => {
        cy.get('[type="email"]').type('thauan.professor@academico.ifpb.edu.br');
        cy.get('[type="password"]').type('123456');
        cy.get('button').click();
        cy.contains('Tabela de Extrações SUAP');
    });

    it("verifica se as disciplinas foram adicionadas no professor", () => {
        cy.get('.item-menu-icon > .mat-icon').click()
        cy.get(':nth-child(1) > .mat-list-item-content').click()
        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(2)').contains('Matematica Basica')
        cy.get('.p-datatable-tbody > :nth-child(2) > :nth-child(2)').contains('Metodologia da Pesquisa Cientifica')
    });
})
