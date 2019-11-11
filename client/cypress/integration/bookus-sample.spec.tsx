describe('Bookus test title', () => {
  it('sub title', () => {
    expect(true).to.equal(true);
  });

  it('visit home', () => {
    cy.visit('/');
  });
});
