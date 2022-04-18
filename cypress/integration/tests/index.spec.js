// index.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('index', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get('nav').contains('Matseðill').click();
  })

  it('visits matseðill', () => {

    cy.visit('http://localhost:3000/menu', {
      timeout: 50000,
      onBeforeLoad (contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      },
      onLoad (contentWindow) {
       // contentWindow is the remote page's window object
       expect(typeof contentWindow === 'object').to.be.true
      },
    })
  })
})