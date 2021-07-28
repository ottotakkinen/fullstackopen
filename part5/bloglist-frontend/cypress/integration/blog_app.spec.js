describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Testi Äbäj',
      username: 'testi',
      password: 'testi',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  describe('Login', function () {
    it('works with correct credentials', function () {
      cy.get('#username').type('testi');
      cy.get('#password').type('testi');
      cy.get('form').submit();
      cy.contains('Logged in as Testi Äbäj');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testi');
      cy.get('#password').type('testiasdasd');
      cy.get('form').submit();
      cy.contains('wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testi', password: 'testi' });
    });

    it('Logged in user can create a blog', function () {
      cy.get('#togglable-newblogform')
        .find('button')
        .contains('Create new blog')
        .click();
      cy.get('#title').type('testtitle');
      cy.get('#author').type('testauthor');
      cy.get('#url').type('testurl');
      cy.get('button').contains('create').click();
      cy.get('html')
        .should('contain', 'testtitle')
        .and('contain', 'testauthor');
    });

    it('Blog can be liked', function () {
      cy.createBlog('halleluja');
      cy.reload();
      cy.get('.blog').find('#btn-blog-view').click();
      cy.get('#btn-blog-like').click();
      cy.get('.blog').should('contain', '1');
    });

    it('Blog can be deleted', function () {
      cy.createBlog('this might work actually');
      cy.reload();
      cy.get('.blog').find('button').click();
      cy.get('#btn-blog-delete').click();
      cy.get('.blog').should('not.exist');
    });

    it('Blogs are sorted by most liked', function () {
      cy.createBlog('This is a good blog!');
      cy.createBlog('But this one is the best lol.');
      cy.reload();

      cy.get('.blog').contains('This is a').find('button').click();
      cy.get('.blog').contains('This is a').find('#btn-blog-like').click();

      cy.get('.blog').contains('But this').find('button').click();
      cy.get('.blog').contains('But this').find('#btn-blog-like').click();
      cy.get('.blog').contains('But this').find('#btn-blog-like').click();

      cy.get('.blog').first().should('contain', 'But this');
    });
  });
});
