/// <reference types="Cypress" />

import {
  SIGNUP_VALIDATION_FIRST_NAME,
  SIGNUP_VALIDATION_LAST_NAME,
  SIGNUP_VALIDATION_PHONE_NUMBER,
} from '../../src/commons/constants/string';

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
    cy.checkPath('/');
  });

  it('잘못된 성 입력 시 caption이 표시된다.', () => {
    cy.get('[data-testid=signupform-lastname]').type('test');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[1]).to.have.css('visibility', 'visible');
      expect(items[1]).to.have.text(SIGNUP_VALIDATION_LAST_NAME);
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
      expect(items[2]).to.have.text(SIGNUP_VALIDATION_FIRST_NAME);
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
      expect(items[3]).to.have.text(SIGNUP_VALIDATION_PHONE_NUMBER);
    });
  });

  it('올바른 휴대폰 번호 입력 시 caption이 표시되지 않는다.', () => {
    cy.get('[data-testid=signupform-phonenumber]').type('01012345678');
    cy.get('[data-testid=formcaption]').within(items => {
      expect(items[3]).to.have.css('visibility', 'hidden');
    });
  });

  // TODO: 회원가입에 대한 API 수정 후 아래의 테스트 작성 필요
  // Oauth 토큰이 유효하지 않은 경우
  // 폼의 입력이 유효하지 않은 경우
  // 이미 가입되어 있는 회원일 경우
});
