describe('Приложение работает корректно', function() {
    before(function() {
        cy.visit(Cypress.env("host"));
    });
    it('Открыта страница конструктора', function() {
        cy.contains('Соберите бургер');
    });
    it('Перетащить ингредиенты', function () {
        cy.contains('Краторная булка N-200i').trigger('dragstart');
        cy.contains('Перетащите сюда булки!').trigger('drop');
        cy.contains('Соус Spicy-X').trigger('dragstart');
        cy.contains('Перетащите сюда ингридиенты!').trigger('drop');
        cy.contains('Оформить заказ').click();
    })
    it('Страница логина', function () {
        cy.get("input[name=email]").type('m.mary1.m@inbox.ru');
        cy.get("input[name=password]").type('123qwe');
        cy.get("button").contains("Войти").click();
    })
    it('Заказ оформлен', function () {
        cy.contains('Оформить заказ').click();
        cy.wait(20000);
        cy.get('#modal').click();
    })
    it('Закрыть модальное окно', function () {
        cy.get("[class*=Modal_modalCloseButton]").click();
    })
    it('Открыть окно ингредиента', function () {
        cy.contains('Краторная булка N-200i').click();
        cy.get('#modal');
    })
});
export {};
