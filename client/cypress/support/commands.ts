/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Cypress {
  interface Chainable<Subject> {
    authLogin(): Chainable<Subject>;
    checkPath(pathname: string | RegExp, chainer?: string): Chainable<Subject>;
    goPurchasePage(): Chainable<Subject>;
    checkAlertWhenClicked(
      selector: string,
      calledWithAlertString?: string,
    ): Chainable<Subject>;
  }
}

Cypress.Commands.add('authLogin', () => {
  cy.setCookie('UID', Cypress.env('auth_token'));
  cy.server();
  cy.route('POST', '/api/auth', 'fixture:auth.json');
});

Cypress.Commands.add(
  'checkPath',
  (pathname: string | RegExp, chainer?: string) => {
    if (chainer) {
      cy.location('pathname').should(chainer, pathname);
      return;
    }
    cy.location('pathname').should('eq', pathname);
  },
);

Cypress.Commands.add('goPurchasePage', () => {
  cy.get('[data-testid=ticketbox-chkbox]').click();
  cy.get('[data-testid=ticketchoice-submitbtn]').click();
});

Cypress.Commands.add(
  'checkAlertWhenClicked',
  (selector: string, calledWithAlertString?: string) => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get(selector)
      .click()
      .then(() => {
        if (calledWithAlertString) {
          expect(alertStub.getCall(0)).to.be.calledWith(calledWithAlertString);
          return;
        }
        expect(alertStub.getCall(0)).to.be.calledOnce;
      });
  },
);
