/// <reference types="Cypress" />

context('메인 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/events?cnt=12', 'fixture:events.json').as('getEvents');
    cy.route(/(\/api\/events\?cnt=12&startAt=).+/, 'fixture:events.json').as(
      'getEventsMore',
    );

    cy.visit('/');
  });

  it('정상적인 접속이 가능하다.', () => {
    cy.visit('/');
  });

  it('스크롤이 하단에 위치할 때마다 이벤트들이 나타난다.', () => {
    cy.wait('@getEvents');
    cy.get('[data-testid=main-card]').within(items => {
      expect(items).to.have.length(12);
    });

    cy.wait(1500);
    cy.scrollTo('bottom');
    cy.wait('@getEventsMore');

    cy.wait(1500);
    cy.get('[data-testid=main-card]').within(items => {
      expect(items).to.have.length(24);
    });

    cy.scrollTo('bottom');
    cy.wait('@getEventsMore');

    cy.wait(1500);
    cy.get('[data-testid=main-card]').within(items => {
      expect(items).to.have.length(36);
    });
  });
});
