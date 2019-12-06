/// <reference types="Cypress" />

context('로그인 페이지', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('정상적인 접속 가능', () => {
    cy.visit('/login');
  });
});
