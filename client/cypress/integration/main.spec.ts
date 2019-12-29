/// <reference types="Cypress" />

context('메인 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/events?cnt=12', 'fixture:events/events.json').as(
      'getEvents',
    );
    cy.route('/api/events/331', 'fixture:events/event.json').as(
      'getEventDetail',
    );
    cy.route(
      /(\/api\/events\?cnt=12&startAt=).+/,
      'fixture:events/fetched_events.json',
    ).as('getEventsMore');

    cy.authLogin();

    cy.visit('/');
  });

  it('페이지 접속 시 이벤트 정보들을 가져온다.', () => {
    cy.wait('@getEvents');
    cy.get('[data-testid=main-card]').within(items => {
      expect(items).to.have.length(12);
    });
  });

  it('스크롤이 하단에 위치할 때마다 이벤트들이 나타난다.', () => {
    cy.wait('@getEvents');
    cy.get('[data-testid=main-card]').within(items => {
      expect(items).to.have.length(12);
    });

    cy.wait(1500);
    cy.scrollTo('bottom');
    cy.wait('@getEventsMore');

    cy.wait(5000);
    cy.get('[data-testid=main-card]', { timeout: 3000 }).within(items => {
      expect(items).to.have.length(24);
    });
  });

  it('메인 배너의 이벤트 주최하기 버튼 클릭 시 이벤트 주최하기 페이지로 이동된다.', () => {
    cy.get('[data-testid=mainbanner-btn]').click();
    cy.checkPath('/event/create');
  });

  it('카드를 클릭 시 이벤트 상세보기 페이지로 이동된다.', () => {
    cy.get('[data-testid=main-card]:first').click();
    cy.checkPath(/^\/events\/[0-9]+$/, 'match');
  });
});
