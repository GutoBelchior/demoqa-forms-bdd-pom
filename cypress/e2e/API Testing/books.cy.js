
describe('BookStore API - List Books', () => {
  it('should list books (200) with non-empty array and basic schema', () => {
    cy.apiListBooks().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('books').that.is.an('array').and.is.not.empty;

      const book = res.body.books[0];
      expect(book).to.have.all.keys(
        'isbn', 'title', 'subTitle', 'author', 'publish_date', 'publisher',
        'pages', 'description', 'website'
      );
      expect(book.isbn).to.be.a('string');
    });
  });
});
