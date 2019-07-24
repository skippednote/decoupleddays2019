/// <reference types="Cypress" />

describe("Session", () => {
  it("checks a11y on login page", () => {
    cy.visit("/login");
    cy.injectAxe();
    cy.checkA11y();
  });
});
