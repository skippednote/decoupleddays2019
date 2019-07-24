describe("visual regression", () => {
  it("checks if the UI looks as expected", () => {
    cy.visit("/");
    // open filter
    // input session name
    // click on button
    cy.percySnapshot();
  });
});
