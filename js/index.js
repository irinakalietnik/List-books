document.addEventListener("DOMContentLoaded", function () {
  class Book {
    constructor(name, author, genre, publication) {
      this.name = name;
      this.author = author;
      this.genre = genre;
      this.publication = publication;
    }
  }
  class ListBook {
    constructor() {
      this.books = [];
    }

    addBook(name, author, genre, publication) {
      this.books.push(new Book(name, author, genre, publication));
      renderListBooks(this.books);
    }

    changeBook(index) {
      this.books[index].name = name2.value;
      this.books[index].author = author2.value;
      this.books[index].genre = genre2.value;
      this.books[index].publication = publication2.value;
      renderListBooks(this.books);
    }

    deleteBook(index) {
      this.books.splice(index, 1);
      name2.value = "";
      author2.value = "";
      genre2.value = "";
      publication2.value = "";
      renderListBooks(this.books);
    }

    sortBooks(sortOrder) {
      this.books.sort((a, b) => {
        if (a.name < b.name) {
          return sortOrder === "A-Z" ? -1 : 1;
        }
        if (a.name > b.name) {
          return sortOrder === "Z-A" ? -1 : 1;
        }
        return 0;
      });
      renderListBooks(this.books);
    }

    findBook(findWord) {
      const btnSearch = document.getElementById("btnSearch");
      const inputSearch = document.getElementById("inputSearch");
      const autocompleatItems = document.getElementById("autocomplete-items");
      let findWordArr = [];
      let books = this.books;
      books.forEach((book) => {
        findWordArr.push(book[findWord]);
      });
      inputSearch.oninput = function (event) {
        infoBookModal.innerHTML = "";
        const value = event.target.value.toLowerCase();
        autocompleatItems.innerHTML = "";
        if (value) {
          const filteredBooks = findWordArr.filter((item) =>
            item.toLowerCase().includes(value)
          );
          filteredBooks.forEach((book) => {
            const div = document.createElement("div");
            div.classList.add("search__autocomplete-item");
            div.textContent = book;
            div.addEventListener("click", function (e) {
              e.stopPropagation();
              inputSearch.value = book;
              autocompleatItems.innerHTML = "";
            });
            autocompleatItems.appendChild(div);
          });
        }
      };
      btnSearch.onclick = function (event) {
        for (let index = 0; index < books.length; index++) {
          if (inputSearch.value === books[index][findWord]) {
            addInfoModal(books, index);
          }
        }
      };
      document.addEventListener("click", function (event) {
        if (
          !autocompleatItems.contains(event.target) &&
          event.tatget != inputSearch
        ) {
          autocompleatItems.innerHTML = "";
        }
      });
    }
  }

  const infoBookModal = document.getElementById("infoBook");

  function addInfoModal(books, index) {
    modal.classList.remove("backdrop__is-hidden");
    const modalBtnClose = document.querySelector(".modal-btn-close");
    modalBtnClose.onclick = function () {
      modal.classList.add("backdrop__is-hidden");
    };
    infoBookModal.innerHTML = ` <div class="modal__field">
            <span>Name</span>
            <input id="name2" type="text" value='${books[index].name}'/>
          </div>
          <div class="modal__field">
            <span>Author</span>
            <input id="author2" value='${books[index].author}' type="text" />
          </div>
          <div class="modal__field">
            <span>Genre</span>
            <input id="genre2" value='${books[index].genre}' type="text" />
          </div>
          <div class="modal__field">
            <span>Publication</span>
            <input id="publication2" value='${books[index].publication}' type="text" />
          </div> <div class="modal__btns-block">
            <button class="modal__btn" id="btnEdit">Edit</button>
            <button class="modal__btn" id="btnDelete">Delete</button>
          </div>
        </div>`;
    const btnDelete = document.getElementById("btnDelete");
    const btnEdit = document.getElementById("btnEdit");
    btnDelete.addEventListener("click", function () {
      myListBook.deleteBook(index);
      modal.classList.add("backdrop__is-hidden");
    });
    btnEdit.addEventListener("click", function () {
      modal.classList.add("backdrop__is-hidden");
      myListBook.changeBook(index);
    });
  }

  function renderListBooks(books) {
    let listBooks = document.getElementById("listBooks");
    listBooks.innerHTML = "";
    let start = (page - 1) * elementsPerPage;
    let end = Math.min(books.length, start + elementsPerPage);
    const fragment = document.createDocumentFragment();
    for (let index = start; index < end; index++) {
      const li = document.createElement("li");
      li.id = index;
      li.textContent = books[index].name;
      fragment.appendChild(li);
    }
    listBooks.appendChild(fragment);
  }

  function navigationNextPage(event) {
    let books = myListBook.books;
    if (event.target === nextPage && page < books.length / elementsPerPage) {
      pageNumber.textContent = `Page ${++page}`;
      renderListBooks(books);
    } else if (event.target === prevPage && page > 1) {
      pageNumber.textContent = `Page ${--page}`;
      renderListBooks(books);
    }
  }

  const myListBook = new ListBook();
  let page = 1;
  const elementsPerPage = 10;

  myListBook.addBook("Too Late", "Colleen Hoover", "Romance", "Sphere");
  myListBook.addBook("Funny Story", "Emily Henry", "Romance", " Viking");
  myListBook.addBook(
    "Twisted Love. Book 1",
    "Ana Huang",
    "Fanrasy",
    " Piatkus Books"
  );
  myListBook.addBook(
    "Kings of Sin. Book 1",
    "Ana Huang",
    "Action",
    "Piatkus Books"
  );
  myListBook.addBook("Bride", "Ali Hazelwood", "0967028924", " Sphere");

  myListBook.addBook(
    "Red, White & Royal Blue",
    "Casey McQuiston",
    "Horror",
    "Pan MacMillan"
  );
  myListBook.addBook(
    "Crescent City. Book 3",
    "Sarah Janet Maas",
    "Fantasy",
    " Publishing PLC"
  );
  myListBook.addBook(
    "The Song of Achilles",
    "Madeline Miller",
    "Romance",
    "Publishing PLC"
  );
  myListBook.addBook(
    "Fairy Tale",
    "Stiven King",
    "Fantasy",
    "Hodder & Stoughto"
  );
  myListBook.addBook("We Solve Murders", "Richard Osmun", "Action", "Viking");
  myListBook.addBook("Holly (hardback)", "Holly Bleck", "Horror", "Penguin");
  myListBook.addBook("Book of Night", "Richard Osmun", "Romance", "Viking");
  myListBook.findBook("name");
  myListBook.sortBooks("A-Z");

  const btnAddBook = document.getElementById("btnAdd");
  btnAddBook.addEventListener("click", function (event) {
    myListBook.addBook(
      name1.value,
      author1.value,
      genre1.value,
      publication1.value
    );

    name1.value = "";
    author1.value = "";
    genre1.value = "";
    publication1.value = "";
  });

  document
    .getElementById("listBooks")
    .addEventListener("click", function (event) {
      infoBookModal.innerHTML = "";
      if (!event.target.matches("li")) {
        return;
      }
      let books = myListBook.books;
      for (let index = 0; index < books.length; index++) {
        if (event.target.textContent == books[index].name) {
          addInfoModal(books, index);
        }
      }
    });

  const inputsRadioBox = document.querySelector(".search__find-options");
  const inputRadio = document.querySelectorAll('input[type="radio"]');
  const modal = document.querySelector(".backdrop");
  inputsRadioBox.addEventListener("change", chooseOptionFindBook);

  function chooseOptionFindBook(event) {
    inputRadio.forEach((input) => {
      if (input.checked === true && event.target === input) {
        myListBook.findBook(input.dataset.find);
      }
    });
  }

  sort.onchange = function () {
    const sortOrder = document.getElementById("sort").value;
    myListBook.sortBooks(sortOrder);
  };

  paginationControls.addEventListener("click", navigationNextPage);
});
