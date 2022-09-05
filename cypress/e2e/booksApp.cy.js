describe('books app basic tests', () => {

  let bookTitle1 = 'Somethin in the way';
  let bookTitle2 = 'Change';
  let bookDescription = 'Boooook';
  let login = 'test@test.com';
  let password = 'test';
    

  it('page loads', () => { 
    cy.viewport(1440,900)   
    cy.get('.text-light').should('be.visible')
  });

  it("Should successfully login", () => {    
    cy.visit("/booksNode");
    cy.login(login, password);
    cy.contains(`Добро пожаловать ${login}`).should("be.visible");
  });
  
  it("Should not login with empty login", () => {
    cy.visit("/booksNode");
    cy.login(" ", password);    
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле");
  });
  
  it("Should not login with empty password", () => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.get("#mail").type(login);
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it('Should add book',() =>{
    cy.login(login, password);
    cy.addBook(bookTitle1,bookDescription);  
    cy.get('.card-title').last().should('have.text',bookTitle1)
  })
  it('Should add book and add it to Favotires',() =>{    
    cy.viewport(786,800)
    cy.login(login, password);
    cy.addBook(bookTitle2,bookDescription);  
    cy.get('.card-title').last().should('have.text',bookTitle2)
    cy.wait(3000)
    cy.get('.card-footer > .btn').last().click({force:true})
    cy.get('.card-footer > .btn').last().should('have.text', 'Delete from favorite')
  })
  it('Should add book straight to Favorites ',() =>{
    cy.viewport(375,500)
    cy.login(login, password);
    cy.addBookWithFavoritesButton(bookTitle1,bookDescription);  
    cy.get('.card-title').last().should('have.text',bookTitle1);
    cy.get('.card-footer > .btn').last().should('have.text', 'Delete from favorite')
  })
  it('Should not add book with empty title',() =>{
    cy.login(login, password);
    cy.get('.p-0 > .btn').click();
    cy.contains('Submit').click();
    cy.get("#title")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле");
  })
})