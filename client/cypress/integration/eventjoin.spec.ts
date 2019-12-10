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

function goPurchasePage(): void {
  cy.visit('/events/330/register/tickets');
  cy.get('[data-testid=ticketbox-chkbox]').click();
  cy.get('[data-testid=ticketchoice-submitbtn]').click();
}

context('이벤트 예약 페이지', () => {
  beforeEach(() => {
    cy.server();
  });

  it('티켓을 선택하지 않고 구매를 시도한다면 alert가 표시된다.', () => {
    cy.visit('/events/330/register/tickets');
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketchoice-submitbtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_REQUIRE_CHOICE);
      });
  });

  it('(여러 수량을 구매할 수 있는 이벤트의) 티켓 체크박스 클릭 시 수량 카운터가 보여진다.', () => {
    cy.visit('/events/330/register/tickets');
    cy.get('[data-testid=ticketbox-chkbox]').click();
    cy.get('[data-testid=counterbox-container]').within(items => {
      expect(items).has.length(1);
    });
  });

  // TODO: 이벤트 글로벌 스토어 적용 후에 반영 가능
  it('(하나의 티켓만 구매할 수 있는 이벤트의) 티켓 체크박스 클릭 시 수량 카운터는 보여지지 않는다.', () => {
    //   cy.visit('/events/330/register/tickets');
    //   cy.get('[data-testid=ticketbox-chkbox]').click();
    //   cy.get('[data-testid=counterbox-container]').should('not.exist');
  });

  it('상단의 목차가 예약이 진행될 때마다 스타일이 변경되며 올바르게 표시된다.', () => {
    cy.visit('/events/330/register/tickets');

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

  it('로그인이 되어있지 않은 상태로 예약을 시도하면 alert와 login으로 리다이렉션이 이루어진다', () => {
    cy.route({
      method: 'POST',
      url: '/api/users/ticket',
      status: 401,
      response: {},
    });

    goPurchasePage();

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketpurchase-purchasebtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_REQUIRE_LOGIN);
      });

    cy.location('pathname').should('eq', '/login');
  });

  it('예약 응답이 NOT_FOUND 이라면 alert가 표시된다', () => {
    cy.route({
      method: 'POST',
      url: '/api/users/ticket',
      status: 404,
      response: {},
    });

    goPurchasePage();

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketpurchase-purchasebtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_WRONG_NUMBER);
      });
  });

  it('예약 응답이 FORBIDDEN / 유효하지 않은 일정이라면 alert가 표시된다', () => {
    cy.route({
      method: 'POST',
      url: '/api/users/ticket',
      status: 403,
      response: { state: NOT_OPEN },
    });

    goPurchasePage();

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketpurchase-purchasebtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_INVALID_DATE);
      });
  });

  it('예약 응답이 FORBIDDEN / 매진이라면 alert가 표시된다', () => {
    cy.route({
      method: 'POST',
      url: '/api/users/ticket',
      status: 403,
      response: { state: SOLD_OUT },
    });

    goPurchasePage();

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketpurchase-purchasebtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_SOLD_OUT);
      });
  });

  it('예약 응답이 FORBIDDEN / 1인당 티켓 개수 초과라면 alert가 표시된다', () => {
    cy.route({
      method: 'POST',
      url: '/api/users/ticket',
      status: 403,
      response: { state: EXCEED_LIMIT },
    });

    goPurchasePage();

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketpurchase-purchasebtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_PER_PERSON_OVER);
      });
  });

  it('예약이 성공적으로 이루어지면 alert와 main으로 리다이렉션이 이루어진다', () => {
    cy.route('POST', '/api/users/ticket', {});

    goPurchasePage();
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid=ticketpurchase-purchasebtn]')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(RESERVE_COMPLETE);
      });

    cy.location('pathname').should('eq', '/');
  });
});
