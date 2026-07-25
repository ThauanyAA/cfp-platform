describe('Cadastro de Eventos', () => {
  beforeEach(() => {
    cy.visit('/event/new');
  });

  it('deve realizar o cadastro de evento com sucesso', () => {
    // Preenche os campos usando seletores CSS convencionais
    cy.get('#name').type('Workshop de Angular Avançado');
    cy.get('#address').type('Av. das Nações Unidas, 12901 - São Paulo, SP');
    cy.get('#capacity').type('120');
    cy.get('#date').type('2026-10-15');

    // Clica no botão de submeter (que agora deve estar habilitado)
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // Verifica se a submissão ocorreu com sucesso
    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').should('contain', 'Cadastro Concluído!');
    cy.get('.alert-success').should('contain', 'Seu evento foi cadastrado com sucesso.');
  });

  it('deve exibir mensagens de erro de validação ao submeter formulário vazio', () => {
    // Como o botão de submissão inicia desabilitado, submetemos o formulário diretamente para disparar a validação
    cy.get('form').submit();

    // Usa asserções para verificar se as mensagens de erro de validação aparecem na tela
    cy.contains('Nome é obrigatório.').should('be.visible');
    cy.contains('Endereço é obrigatório.').should('be.visible');
    cy.contains('Capacidade é obrigatória.').should('be.visible');
    cy.contains('Data é obrigatória.').should('be.visible');
  });
});
