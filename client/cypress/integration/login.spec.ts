/// <reference types="Cypress" />

context('로그인 페이지', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('/login');
  });

  it('로고 이미지를 클릭 시 메인으로 리다이렉트된다.', () => {
    cy.get('[data-testid=login-logo]').click();
    cy.checkPath('/');
  });

  it('구글 로그인 버튼이 표시된다.', () => {
    cy.get('[data-testid=login-btn] button').eq(0);
  });
});
