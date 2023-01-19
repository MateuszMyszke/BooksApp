{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
    },
  };
  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

  const render = function () {
    for (const book of dataSource.books){
      const generatedHTML = templates.books(book);
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML); 
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(generateDOMElement);
    }
  };

  render();
}