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
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.filters = [];
      thisBooksList.favoriteBooks = [];

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    initData() {
      this.data = dataSource.books;
    }

    render() {
      const thisBooksList = this;
      for (const book of this.data) {
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = ratingBgc * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        const generatedHTML = templates.books(book);
        const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.booksList);
        booksContainer.appendChild(generateDOMElement);
      }
    }

    getElements() {
      const thisBooksList = this;
      thisBooksList.container = document.querySelector(select.containerOf.booksList);
      thisBooksList.checkbox = document.querySelector(select.containerOf.filters);
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.container.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickOnBook = event.target;
        if (clickOnBook.offsetParent.classList.contains('book__image')) {
          const bookId = clickOnBook.offsetParent.getAttribute('data-id');
          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            clickOnBook.offsetParent.classList.add(classFav.favorite);
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            clickOnBook.offsetParent.classList.remove(classFav.favorite);
            const bookIndex = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(bookIndex, 1);
          }
        }
      });

      thisBooksList.checkbox.addEventListener('click', function (event) {
        const booksFilter = event.target;
        if (
          booksFilter.tagName == 'INPUT' &&
          booksFilter.name == 'filter' &&
          booksFilter.type == 'checkbox'
        ) {
          const filterValue = booksFilter.value;
          console.log(filterValue);
          if (booksFilter.checked == true) {
            thisBooksList.filters.push(filterValue);
          } else {
            const checkedValue = thisBooksList.filters.indexOf(filterValue);
            thisBooksList.filters.splice(checkedValue, 1);
          }
          console.log('filters:', thisBooksList.filters);
        }
        thisBooksList.filterBooks(thisBooksList.filters);
      });
    }

    filterBooks(filters) {
      for (const book of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        const selectImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden) {
          selectImage.classList.add('hidden');
        } else {
          selectImage.classList.remove('hidden');
        }
        console.log(selectImage);
      }
    }
  
    determineRatingBgc(rating) {
      const thisBooksList = this;
      thisBooksList.ratingBgc = '';
      if (rating < 6) { //the numbers determine the ranking of the books
        thisBooksList.ratingBgc ='linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%'; //white-yellow color
      } else if (rating > 6 && rating <= 8) {
        thisBooksList.ratingBgc ='linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%'; //light-green color
      } else if (rating > 8 && rating <= 9) {
        thisBooksList.ratingBgc =`linear-gradient(to bottom, #299a0b 0%, #299a0b 100%`; //dark-green color
      } else if (rating > 9) {
        thisBooksList.ratingBgc ='linear-gradient(to bottom, #ff0084 0%,#ff0084 100%'; //pink color
      }
      return thisBooksList.ratingBgc;
    }
  }

  const app = new BooksList();
  console.log(app);
}