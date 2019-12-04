/// <reference types="Cypress" />

// import Card from '../../src/components/molecules/Card';

context('이벤트 상세 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/events/331', 'fixture:event.json').as('getEventDetail');

    cy.visit('/events/331');
  });

  it('정상적인 접속이 가능하다.', () => {
    cy.visit('/events/331');
  });
});
