/// <reference types="Cypress" />

context('이벤트 상세 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/events/331', 'fixture:event.json').as('getEventDetail');
    cy.visit('/events/331');
  });

  it('페이지 접속 시 이벤트 상세정보를 가져온다.', () => {
    cy.wait('@getEventDetail');
  });
});
