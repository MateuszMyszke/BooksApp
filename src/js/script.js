{
  ('use strict');
  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },

    book: {
      image: '.books-list .book__image',
    },
  };
  const classFav = {
    favorite: 'favorite',
  };
  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };
  const render = function () {
    for (const book of dataSource.books) {
      const generatedHTML = templates.books(book);
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(
        select.containerOf.booksList
      );
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

    checkbox.addEventListener('click', function (event) {
      const booksFilter = event.target;
      if (
        booksFilter.tagName == 'INPUT' &&
        booksFilter.name == 'filter' &&
        booksFilter.type == 'checkbox'
      ) {
        const filterValue = booksFilter.value;
        console.log(filterValue);
        if (booksFilter.checked == true) {
          filters.push(filterValue);
        } else {
          const checkedValue = filters.indexOf(filterValue);
          filters.splice(checkedValue, 1);
        }
        console.log('filters:', filters);
      }
      filterBooks();
    });
  }
  const filters = [];
  const checkbox = document.querySelector(select.containerOf.filters);

  const filterBooks = function () {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      const selectImage = document.querySelector(
        '.book__image[data-id="' + book.id + '"]'
      );
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        selectImage.classList.add('hidden');
      } else {
        selectImage.classList.remove('hidden');
      }
      console.log(selectImage);
    }
  };

  render();
  initActions();
}