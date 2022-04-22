// index.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('index', () => {
  beforeEach(() => {
    cy.visit('https://vef2-2022-h2-mocha.vercel.app/');
  })

  it('visits matseðill', () => {
    cy.contains('Matseðill').click();
    cy.url().should('include', '/menu')
  })
})