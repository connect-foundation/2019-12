/// <reference types="Cypress" />

context('회원가입 페이지', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '/api/users',
      status: 500,
    }).as('postUser');

    cy.visit('/signup');
  });

  it('정상적인 접속 가능', () => {
    cy.visit('/signup');
  });

  it('로고 클릭 시 메인 페이지로 이동한다.', () => {
    cy.get('[data-testid=signup-logo]').click();
    cy.location('pathname').should('eq', '/');
  });

  it('잘못된 성 입력 시 caption이 표시된다.', () => {
    cy.get('[data-testid=signupform-lastname]').type('test');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[1]).to.have.css('visibility', 'visible');
    });
  });

  it('올바른 성 입력 시 caption이 표시되지 않는다.', () => {
    cy.get('[data-testid=signupform-lastname]').type('조');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[1]).to.have.css('visibility', 'hidden');
    });
  });

  it('잘못된 이름 입력 시 caption이 표시된다.', () => {
    cy.get('[data-testid=signupform-firstname]').type('test');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[2]).to.have.css('visibility', 'visible');
    });
  });

  it('올바른 이름 입력 시 caption이 표시되지 않는다.', () => {
    cy.get('[data-testid=signupform-firstname]').type('성동');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[2]).to.have.css('visibility', 'hidden');
    });
  });

  it('잘못된 휴대폰 번호 입력 시 caption이 표시된다.', () => {
    cy.get('[data-testid=signupform-phonenumber]').type('0101234');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[3]).to.have.css('visibility', 'visible');
    });
  });

  it('올바른 휴대폰 번호 입력 시 caption이 표시되지 않는다.', () => {
    cy.get('[data-testid=signupform-phonenumber]').type('01012345678');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[3]).to.have.css('visibility', 'hidden');
    });
  });

  it('토큰이 없거나 폼이 유효하지 않다면 회원가입이 이루어지지 않는다.', () => {
    cy.get('[data-testid=signupform-submit]').click();
    cy.wait('@postUser').then(xhr => {
      expect(xhr.status).equal(500);
    });
  });
});
