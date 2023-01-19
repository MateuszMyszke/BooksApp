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
    const bookList = document.querySelector(select.containerOf.booksList);
    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickOnBook = event.target;
      if (clickOnBook.offsetParent.classList.contains('book__image')) {
        const bookId = clickOnBook.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) {
          clickOnBook.offsetParent.classList.add(classFav.favorite);
          favoriteBooks.push(bookId);
        } else {
          clickOnBook.offsetParent.classList.remove(classFav.favorite);
          const bookIndex = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(bookIndex, 1);
        }
      }
    }); 
  }

  render();
  initActions();
}