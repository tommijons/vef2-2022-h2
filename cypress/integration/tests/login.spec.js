// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('login', () => {
  beforeEach(() => {
    cy.visit('https://vef2-2022-h2-mocha.vercel.app/');
  })

  it('adds to cart', () => {
    cy.contains('Innskrá').click();
    cy.get('input#username').type('admin');
    cy.get('input#password').type('1234567890');
    cy.get('button').click();
    cy.get('footer > p').should('contain', 'Skráður inn sem');
    cy.get('p > b').should('contain', 'admin');
  })
})