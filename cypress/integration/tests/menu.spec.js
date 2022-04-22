// menu.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('menu leit', () => {
  beforeEach(() => {
    cy.visit('https://vef2-2022-h2-mocha.vercel.app/');
  })

  it('adds to cart', () => {
    cy.contains('Matseðill').click();
    cy.get('input').type('vængir');
    cy.get('h3 > a').should('contain', 'Vængir');
  })
})