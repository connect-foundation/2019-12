/// <reference types="Cypress" />

context('이벤트 상세 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/events/331', 'fixture:events/event.json').as(
      'getEventDetail',
    );

    cy.route('/api/events/5', 'fixture:events/always_buy_refund_event.json');
    cy.route('/api/events/7', 'fixture:events/over_sale_event.json');
    cy.route('/api/events/8', 'fixture:events/has_one_ticket_event.json');
    cy.route('/api/events/9', 'fixture:events/sold_out_event.json');
  });

  it('페이지 접속 시 이벤트 상세정보를 가져온다.', () => {
    cy.visit('/events/331');
    cy.wait('@getEventDetail');
  });

  describe('티켓과 등록 버튼의 표시 상태', () => {
    it('비공개 이벤트에서 티켓과 등록 버튼의 표시 상태', () => {
      cy.visit('/events/7');
      cy.get('[data-testid=left-count]').contains('비공개');
      cy.get('[data-testid=icon-label]').should('have.length', 2);
    });

    it('종료된 이벤트에서 티켓과 등록 버튼의 표시 상태', () => {
      cy.visit('/events/7');

      cy.get('[data-testid=event-detail-submit-btn]').contains(
        '이벤트가 종료되었습니다',
      );
      cy.get('[data-testid=event-detail-submit-btn]').and(button => {
        expect(button).to.have.css('background-color', 'rgb(158, 158, 158)');
      });

      cy.get('[data-testid=ticket-container]').and(container => {
        expect(container).to.have.css('color', 'rgb(189, 189, 189)');
      });

      cy.get('[data-testid=icon-label]')
        .eq(1)
        .contains('판매기간이 지났습니다');
    });

    it('구매 가능한 이벤트에서 티켓과 등록 버튼의 표시 상태', () => {
      cy.visit('/events/5');

      cy.get('[data-testid=event-detail-submit-btn]').contains('등록');
      cy.get('[data-testid=event-detail-submit-btn]').and(button => {
        expect(button).to.have.css('background-color', 'rgb(255, 45, 84)');
      });

      cy.get('[data-testid=ticket-container]').and(container => {
        expect(container).to.have.css('color', 'rgb(65, 65, 65)');
      });

      cy.get('[data-testid=icon-label]')
        .eq(1)
        .contains('2200년 03월 23일 (일) 오후 01:00 마감');
    });

    it('판매 기간이 지난 이벤트에서 티켓과 등록 버튼의 표시 상태', () => {
      cy.visit('/events/7');

      cy.get('[data-testid=event-detail-submit-btn]').contains(
        '이벤트가 종료되었습니다.',
      );
      cy.get('[data-testid=event-detail-submit-btn]').and(button => {
        expect(button).to.have.css('background-color', 'rgb(158, 158, 158)');
      });

      cy.get('[data-testid=ticket-container]').and(container => {
        expect(container).to.have.css('color', 'rgb(189, 189, 189)');
      });

      cy.get('[data-testid=icon-label]')
        .eq(1)
        .contains('판매기간이 지났습니다');
    });

    it('판매가 시작되고 아직 판매기간이 남은 이벤트에서 티켓과 등록 버튼의 표시 상태', () => {
      cy.visit('/events/8');

      cy.get('[data-testid=event-detail-submit-btn]').contains('등록');
      cy.get('[data-testid=event-detail-submit-btn]').and(button => {
        expect(button).to.have.css('background-color', 'rgb(255, 45, 84)');
      });

      cy.get('[data-testid=ticket-container]').and(container => {
        expect(container).to.have.css('color', 'rgb(65, 65, 65)');
      });

      cy.get('[data-testid=icon-label]')
        .eq(1)
        .contains('2200년 04월 14일 (월) 오전 10:00 마감');
    });

    it('티켓이 매진된 이벤트에서 티켓과 등록 버튼의 표시 상태', () => {
      cy.visit('/events/9');
      cy.get('[data-testid=event-detail-submit-btn]').contains(
        '이벤트가 종료되었습니다',
      );
      cy.get('[data-testid=ticket-container]').and(container => {
        expect(container).to.have.css('color', 'rgb(189, 189, 189)');
      });
      cy.get('[data-testid=icon-label]')
        .eq(2)
        .contains('매진되었습니다');
    });
  });
});
