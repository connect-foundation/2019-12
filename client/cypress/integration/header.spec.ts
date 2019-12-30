/// <reference types="Cypress" />

context('헤더', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('이벤트 주최하기 클릭 시 이벤트 주최 페이지로 이동한다', () => {
    cy.authLogin();

    cy.get('[data-testid=header-create]').click();
    cy.checkPath('/event/create');
  });

  it('로그인 버튼 클릭 시 로그인 페이지로 이동된다.', () => {
    cy.get('[data-testid=header-account]').click();
    cy.checkPath('/login');
  });

  it('로고 클릭 시 메인 페이지로 이동한다.', () => {
    cy.get('[data-testid=header-home]').click();
    cy.checkPath('/');
  });
});
