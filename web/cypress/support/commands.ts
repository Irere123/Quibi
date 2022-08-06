import { defaultTestUsername } from "./test-constants";

Cypress.Commands.add("loginTestUser", (value = defaultTestUsername) => {
  cy.viewport(2560, 1440);
  cy.visit("/", {
    onBeforeLoad(win) {
      cy.stub(win, "prompt").returns(value);
    },
  });

  return cy.dataTestId("create-test-user").click();
});
