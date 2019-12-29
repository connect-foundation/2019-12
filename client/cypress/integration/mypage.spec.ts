/// <reference types="Cypress" />

context('마이페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/users/tickets', 'fixture:tickets/my_ticket.json');
    cy.route('/api/users/events', 'fixture:events/my_events.json');

    cy.authLogin();
    cy.visit('/my/tickets');
  });

  describe('탭', () => {
    it('탭의 "내 티켓"를 클릭하면 탭이 focus(underline) 된다.', () => {
      cy.get('[data-testid=lnb-item]')
        .eq(0)
        .click()
        .then(lnbItem => {
          cy.log(lnbItem.css('border-bottom'));
          expect(lnbItem.css('border-bottom')).to.be.not.undefined;
        });
    });

    it('탭의 "주최한 이벤트"를 클릭하면 탭이 focus(underline) 된다.', () => {
      cy.get('[data-testid=lnb-item]')
        .eq(1)
        .click()
        .then(lnbItem => {
          expect(lnbItem.css('border-bottom')).to.be.not.undefined;
        });
    });

    it('탭의 "로그아웃"을 클릭하면 쿠키(토큰)이 제거되며 메인으로 리다이렉트된다.', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('[data-testid=lnb-item]')
        .eq(2)
        .click()
        .then(() => {
          expect(alertStub).to.be.calledOnce;
        });

      cy.checkPath('/');
      cy.clearCookie('UID');
      cy.getCookie('UID').should('not.exist');
    });
  });

  describe('(구매한 티켓이 없을 때) 내 티켓', () => {
    it('존재하지 않는다는 문구가 표시된다.', () => {});
  });

  describe('(구매한 티켓이 있을 때) 내 티켓', () => {
    it('구매한 티켓들이 표시된다.', () => {
      cy.get('[data-testid=main-card]').within(items => {
        expect(items).to.have.length.above(0);
      });
    });

    it('티켓을 클릭하면 티켓의 상세내용을 확인할 수 있다.', () => {
      cy.get('[data-testid=main-card]:first').click();
      cy.checkPath(/^\/my\/tickets\/event\/[0-9]+$/, 'match');
      cy.get('[data-testid=event-section]');
      cy.get('[data-testid=ticket-box]');
    });
  });

  describe('(주최한 이벤트가 없을 때) 주최한 이벤트', () => {
    it('존재하지 않는다는 문구가 표시된다.', () => {});
  });

  describe('(주최한 이벤트가 있을 때) 주최한 이벤트', () => {
    beforeEach(() => {
      cy.get('[data-testid=lnb-item]')
        .eq(1)
        .click();
    });
    it('주최한 이벤트들이 표시된다.', () => {
      cy.get('[data-testid=main-card]').within(items => {
        expect(items).to.have.length.above(0);
      });
    });

    it('주최한 이벤트를 클릭하면 이벤트 상세로 리다이렉트 된다.', () => {
      cy.get('[data-testid=main-card]:first').click();
      cy.checkPath(/^\/events\/[0-9]+$/, 'match');
    });
  });
});
