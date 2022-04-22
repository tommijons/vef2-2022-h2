// cart.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('cart', () => {
  beforeEach(() => {
    cy.visit('https://vef2-2022-h2-mocha.vercel.app/menu');
  })

  it('adds to cart', () => {
    cy.contains('Bæta í körfu').click();
    cy.get('p.Layout_layout__cartItems__fSe83').should('contain','1');
    cy.contains('Bæta í körfu').click();
    cy.get('p.Layout_layout__cartItems__fSe83').should('contain','2');
  })
})