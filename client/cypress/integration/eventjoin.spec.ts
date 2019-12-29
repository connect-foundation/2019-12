/// <reference types="Cypress" />

import {
  RESERVE_REQUIRE_LOGIN,
  RESERVE_REQUIRE_CHOICE,
  RESERVE_COMPLETE,
  RESERVE_WRONG_NUMBER,
  RESERVE_INVALID_DATE,
  RESERVE_SOLD_OUT,
  RESERVE_PER_PERSON_OVER,
} from '../../src/commons/constants/string';
import {
  NOT_OPEN,
  SOLD_OUT,
  EXCEED_LIMIT,
} from '../../src/commons/constants/number';

context('이벤트 예약 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route('/api/events/8', 'fixture:events/has_one_ticket_event.json');
    cy.route('/api/events/2', 'fixture:events/always_buy_refund_event.json');
    cy.route('POST', '/api/users/reserve/check', 'OK').as('joinCheck');
    cy.authLogin();
    cy.visit('/events/2/register/tickets');
    cy.wait('@joinCheck');
  });

  describe('티켓 수량 카운터', () => {
    it('(여러 수량을 구매할 수 있는 이벤트의) 티켓 체크박스 클릭 시 수량 카운터가 보여진다.', () => {
      cy.get('[data-testid=ticketbox-chkbox]').click();
      cy.get('[data-testid=counterbox-container]').should('exist');
    });

    it('(하나의 티켓만 구매할 수 있는 이벤트의) 티켓 체크박스 클릭 시 수량 카운터는 보여지지 않는다.', () => {
      cy.visit('/events/8/register/tickets');
      cy.get('[data-testid=ticketbox-chkbox]').click();
      cy.get('[data-testid=counterbox-container]').should('not.exist');
    });
  });

  it('상단의 목차가 예약이 진행될 때마다 스타일이 변경되며 올바르게 표시된다.', () => {
    cy.get('[data-testid=steplist-step]').within(items => {
      expect(items[0]).to.have.css('color', 'rgb(65, 65, 65)');
      expect(items[1]).to.have.css('color', 'rgb(158, 158, 158)');
    });
    cy.get('[data-testid=steplist-step-arrow]').within(items => {
      expect(items[0]).to.have.css('color', 'rgb(158, 158, 158)');
    });

    cy.get('[data-testid=ticketbox-chkbox]').click();
    cy.get('[data-testid=ticketchoice-submitbtn]').click();

    cy.get('[data-testid=steplist-step]').within(items => {
      expect(items[0]).to.have.css('color', 'rgb(65, 65, 65)');
      expect(items[1]).to.have.css('color', 'rgb(65, 65, 65)');
    });
    cy.get('[data-testid=steplist-step-arrow]').within(items => {
      expect(items[0]).to.have.css('color', 'rgb(65, 65, 65)');
    });
  });

  describe('예약 시도', () => {
    it('로그인이 되어있지 않은 상태로 예약을 시도하면 alert와 login으로 리다이렉션이 이루어진다', () => {
      cy.route({
        method: 'POST',
        url: '/api/users/reserve',
        status: 401,
        response: {},
      });

      cy.goPurchasePage();
      cy.checkAlertWhenClicked(
        '[data-testid=ticketpurchase-purchasebtn]',
        RESERVE_REQUIRE_LOGIN,
      );

      cy.checkPath('/login');
    });

    it('티켓을 선택하지 않고 구매를 시도한다면 alert가 표시된다.', () => {
      cy.checkAlertWhenClicked(
        '[data-testid=ticketchoice-submitbtn]',
        RESERVE_REQUIRE_CHOICE,
      );
    });

    it('예약 응답이 NOT_FOUND 이라면 alert가 표시된다', () => {
      cy.route({
        method: 'POST',
        url: '/api/users/reserve',
        status: 404,
        response: {},
      });

      cy.goPurchasePage();
      cy.checkAlertWhenClicked(
        '[data-testid=ticketpurchase-purchasebtn]',
        RESERVE_WRONG_NUMBER,
      );
    });

    it('예약 응답이 FORBIDDEN / 유효하지 않은 일정이라면 alert가 표시된다', () => {
      cy.route({
        method: 'POST',
        url: '/api/users/reserve',
        status: 403,
        response: { state: NOT_OPEN },
      });

      cy.goPurchasePage();
      cy.checkAlertWhenClicked(
        '[data-testid=ticketpurchase-purchasebtn]',
        RESERVE_INVALID_DATE,
      );
    });

    it('예약 응답이 FORBIDDEN / 매진이라면 alert가 표시된다', () => {
      cy.route({
        method: 'POST',
        url: '/api/users/reserve',
        status: 403,
        response: { state: SOLD_OUT },
      });

      cy.goPurchasePage();
      cy.checkAlertWhenClicked(
        '[data-testid=ticketpurchase-purchasebtn]',
        RESERVE_SOLD_OUT,
      );
    });

    it('예약 응답이 FORBIDDEN / 1인당 티켓 개수 초과라면 alert가 표시된다', () => {
      cy.route({
        method: 'POST',
        url: '/api/users/reserve',
        status: 403,
        response: { state: EXCEED_LIMIT },
      });

      cy.goPurchasePage();
      cy.checkAlertWhenClicked(
        '[data-testid=ticketpurchase-purchasebtn]',
        RESERVE_PER_PERSON_OVER,
      );
    });

    it('예약이 성공적으로 이루어지면 alert와 내 티켓 페이지로 리다이렉션이 이루어진다', () => {
      cy.route('POST', '/api/users/reserve', {});

      cy.goPurchasePage();
      cy.checkAlertWhenClicked(
        '[data-testid=ticketpurchase-purchasebtn]',
        RESERVE_COMPLETE,
      );

      cy.checkPath('/my/tickets');
    });
  });
});
