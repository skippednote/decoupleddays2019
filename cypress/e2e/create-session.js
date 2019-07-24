/// <reference types="Cypress" />

describe("Session", () => {
  it("creates a news session", () => {

    // login
    cy.visit("/login");
    cy.get(":nth-child(1) > input").type("skippednote");
    cy.get(":nth-child(2) > input").type("skippednote");
    cy.get("form > .button").click();

    // create a session
    cy.get(".navigation > :nth-child(2) > .button").click();
    cy.get("#title").type("E2E test");
    cy.get("iframe");
    cy.window().then(win => {
      win.CKEDITOR.instances.editor1.insertText("Hello World");
    });
    cy.get("#room").select("Room 3");
    cy.get("#date").type("2019-07-17");
    cy.get("#time").type("10:15:00");
    cy.get("#slength").select("50");
    cy.get("#category").select("JavaScript and JAMStack");
    cy.get(".react-select")
      .click()
      .find("input")
      .focus();
    cy.contains("Bassam Ismail").click({ force: true });
    cy.get("form > .button").click();

    // assert session is created
    cy.get("[data-testid=session-title] > a ").should("have.text", "E2E test");
    cy.get(".session-length").should("have.text", "50 minutes");
    cy.get("[data-testid=session-room]").should("have.text", "room3");
    cy.get("[data-testid=session-category]").should(
      "have.text",
      "JavaScript and JAMStack"
    );
    cy.get(".session-body > p").should("contain.text", "Hello");
  });
});
