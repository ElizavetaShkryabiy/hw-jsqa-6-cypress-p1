
Cypress.Commands.add("login", (login, password) => {
    cy.contains("Log in").click();
    cy.get("#mail").type(login);
    cy.get("#pass").type(password);
    cy.contains("Submit").click();
  });
Cypress.Commands.add("fillInput", (title, description) => {
    cy.get('.p-0 > .btn').click();
    cy.get('#title').type(title);
    cy.get('#description').type(description);
});
Cypress.Commands.add("addBook", (title, description) => {
    cy.fillInput(title, description);
    cy.contains('Submit').click();
});
Cypress.Commands.add("addBookWithFavoritesButton", (title, description) => {
    cy.fillInput(title, description);
    cy.get('#favorite').click();
    cy.contains('Submit').click();
});