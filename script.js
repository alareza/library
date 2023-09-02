const library = [];

function Book(title, author, numPages, hasBeenRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasBeenRead = hasBeenRead;
  this.info = function() {
    let read;
    if (hasBeenRead) {
      read = "has been read"
    } else {
      read = "not read yet"
    }
    console.log(title + ", by " + author + ", " + numPages + " pages, " +  read + ".");
    return(title + ", by " + author + ", " + numPages + " pages, " +  read + ".")
  }
}

const cardSection = document.querySelector(".cardSection");

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const titleEl = document.createElement("p");
  const authorEl = document.createElement("p");
  const pageEl = document.createElement("p");
  const readEl = document.createElement("button");
  const removeBtn = document.createElement("button");
  titleEl.textContent = book.title;
  authorEl.textContent = book.author;
  pageEl.textContent = "Pages: " + book.numPages.toString();
  if (book.hasBeenRead) {
    readEl.textContent = "read";
    readEl.style.backgroundColor = "#abdbe3";
  } else {
    readEl.textContent = "not read";
    readEl.style.backgroundColor = "#eeeee4";
  }
  readEl.className = "readButton";
  readEl.addEventListener("click", (e) => {
    if (e.currentTarget.textContent == "read") {
      e.currentTarget.textContent = "not read";
      e.currentTarget.style.backgroundColor = "#eeeee4";
    } else if (e.currentTarget.textContent == "not read") {
      e.currentTarget.textContent = "read";
      e.currentTarget.style.backgroundColor = "#abdbe3";
    }
  });
  removeBtn.className = "removeBtn";
  removeBtn.textContent = "remove";
  removeBtn.addEventListener("click", (e) => {
    const card = removeBtn.parentElement;
    card.remove();
    removeBook(card.getAttribute("data-id"));
  });
  bookCard.className = "card";
  bookCard.appendChild(titleEl);
  bookCard.appendChild(authorEl);
  bookCard.appendChild(pageEl);
  bookCard.appendChild(readEl);
  bookCard.appendChild(removeBtn);
  cardSection.appendChild(bookCard);
  bookCard.setAttribute("data-book", book);
}

function addBookToLibrary(book) {
  library.push(book);
  createBookCard(book)
}

function removeBook(book) {
  library.splice(library.indexOf(book), 1);
}

const book1 = new Book("Harry Potter and the Philosopher's Stone", "JK Rowling", 223, true);
const book2 = new Book("Harry Potter and the Chamber of Secrets", "JK Rowling", 251, true);
const book3 = new Book("Harry Potter and the Prisoner of Azkaban", "JK Rowling", 317, true);
const book4 = new Book("Harry Potter and the Goblet of Fire", "JK Rowling", 636, false);
const book5 = new Book("Harry Potter and the Order of the Phoenix", "JK Rowling", 766, false);
const book6 = new Book("Harry Potter and the Half-Blood Prince", "JK Rowling", 607, false);
const book7 = new Book("Harry Potter and the Deathly Hallows", "JK Rowling", 607, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book7);

const showButton = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const confirmBtn = document.getElementById("confirmBtn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const numPages = document.getElementById("numPages");
const hasBeenRead = document.getElementById("hasBeenRead");
const readButtons = document.querySelectorAll(".readButton");

showButton.addEventListener("click", () => {
  bookDialog.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this form
  bookDialog.close();
  let newBook = new Book(title.value, author.value, numPages.value, hasBeenRead.checked);
  addBookToLibrary(newBook);
});

bookDialog.addEventListener("click", (e) => {
  const dialogDimensions = bookDialog.getBoundingClientRect()
  if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
    bookDialog.close()
  }
});
