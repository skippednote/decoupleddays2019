// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import "@percy/cypress";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get(":nth-child(1) > input").type("skippednote");
  cy.get(":nth-child(2) > input").type("skippednote");
  cy.get("form > .button").click();
});
