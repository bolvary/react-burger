describe('Доступность сервиса', function() {
    it('Страница localhost:3000 доступна', function() {
      cy.visit(Cypress.env("host"));
    });
});
export {};
