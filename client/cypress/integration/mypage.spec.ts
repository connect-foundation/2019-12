/// <reference types="Cypress" />

context('마이페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.setCookie('UID', Cypress.env('auth_token'));
    cy.visit('/my/tickets');
  });

  it('정상적인 접속이 가능하다.', () => {});

  describe('탭', () => {
    beforeEach(() => {
      cy.wait(5000);
    });

    it('탭의 "내 티켓"를 클릭하면 탭이 focus(underline) 된다.', () => {
      cy.get('[data-testid=lnb-item]')
        .eq(0)
        .click()
        .then(lnbItem => {
          cy.log(lnbItem.css('border-bottom'));
          expect(lnbItem.css('border-bottom')).to.be.not.undefined;
        });

      cy.get('[data-testid=lnb-item]')
        .eq(1)
        .click()
        .then(lnbItem => {
          cy.log(lnbItem.css('border-bottom'));
          expect(lnbItem.css('border-bottom')).to.eq('');
        });
    });

    it('탭의 "주최한 이벤트"를 클릭하면 탭이 focus(underline) 된다.', () => {
      cy.get('[data-testid=lnb-item]')
        .eq(1)
        .click()
        .then(lnbItem => {
          expect(lnbItem.css('border-bottom')).to.be.not.undefined;
        });

      cy.get('[data-testid=lnb-item]')
        .eq(0)
        .click()
        .then(lnbItem => {
          cy.log(lnbItem.css('border-bottom'));
          expect(lnbItem.css('border-bottom')).to.eq('');
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

      cy.location('pathname').should('eq', '/');
      cy.clearCookie('UID');
      cy.getCookie('UID').should('not.exist');
    });
  });

  describe('(구매한 티켓이 없을 때) 내 티켓', () => {
    it('존재하지 않는다는 문구가 표시된다.', () => {});
  });

  describe('(구매한 티켓이 있을 때) 내 티켓', () => {
    beforeEach(() => {
      cy.wait(5000);
    });

    it('구매한 티켓들이 표시된다.', () => {
      cy.get('[data-testid=main-card]').within(items => {
        expect(items).to.have.length.above(0);
      });
    });

    it('티켓을 클릭하면 티켓의 상세내용을 확인할 수 있다.', () => {
      cy.get('[data-testid=main-card]:first').click();
      cy.location('pathname').should('match', /^\/my\/tickets\/event\/[0-9]+$/);
      cy.get('[data-testid=event-section]');
      cy.get('[data-testid=ticket-box]');
    });

    it('(환불 마감기간 후라면) 티켓의 기를 클릭하면 alert가 발생한다.', () => {
      cy.get('[data-testid=main-card]')
        .eq(1)
        .click();

      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('[data-testid=refund-btn]')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledOnce;
        });
    });

    it('(환불 마감기간 전이라면) 티켓의 환불하기를 클릭하면 alert가 발생하고 내 티켓 페이지로 리다이렉션 된다.', () => {
      // cy.route({
      //   method: 'DELETE',
      //   url: '/api/users/ticket',
      //   status: 204,
      //   response: {
      //     ticketId: data.id,
      //   },
      // });
      cy.get('[data-testid=main-card]').click();
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);
      cy.get('[data-testid=refund-btn]')
        .click()
        .then(() => {
          expect(alertStub).to.be.calledOnce;
        });
      cy.location('pathname').should('eq', 'my/tickets');
    });
  });

  describe('(주최한 이벤트가 없을 때) 주최한 이벤트', () => {
    it('존재하지 않는다는 문구가 표시된다.', () => {});
  });

  describe('(주최한 이벤트가 있을 때) 주최한 이벤트', () => {
    beforeEach(() => {
      cy.wait(5000);
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
      cy.location('pathname').should('match', /^\/events\/[0-9]+$/);
    });
  });
});
