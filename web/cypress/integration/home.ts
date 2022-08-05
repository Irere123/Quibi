/// <reference  types="cypress" />

describe("mywebsite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("has search", () => {
    cy.get("input");
  });
});
