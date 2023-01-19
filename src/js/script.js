{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
    },

    book: {
      image: '.books-list .book__image',
    },
  };

  const classFav = {
    favorite: 'favorite',
  };
  
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const render = function () {
    
    for (const book of dataSource.books){
      const generatedHTML = templates.books(book);
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML); 
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(generateDOMElement);
    }
  };

  const favoriteBooks = [];

  function initActions() {
    const bookList = document.querySelectorAll(select.book.image);

    for (let book of bookList) {
      book.addEventListener('dblclick', function (event) {
        event.preventDefault();
        book.classList.add(classFav.favorite);
        const bookId = book.getAttribute('data-id');
        favoriteBooks.push(bookId);
      });
    }
  }

  render();
  initActions();
}