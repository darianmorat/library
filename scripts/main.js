class Book {
   constructor(id, title, author, pages, read) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const addBtn = document.querySelector(".add_book");
let myLibrary = [];

// Add book
addBtn.addEventListener("click", () => {
   formValidation();
   const newBook = new Book(Date.now(), title.value, author.value, pages.value, read.checked);
   myLibrary.push(newBook);
   addBookToLibrary(newBook);
   reset();
});

function reset() {
   title.value = "";
   author.value = "";
   pages.value = "";
   read.checked = false;
}

function addBookToLibrary(book) {
   const library = document.querySelector(".library");
   const card = createBookCard(book);
   library.appendChild(card);
}

function createBookCard(book) {
   const div = document.createElement("div");
   const paraTitle = document.createElement("p");
   const paraAuthor = document.createElement("p");
   const paraPages = document.createElement("p");
   const btnContainer = document.createElement("div");
   const readBtn = document.createElement("button");
   const removeBtn = document.createElement("button");

   div.classList.add("book_card");
   btnContainer.classList.add("btn_container");
   readBtn.classList.add("read_btn");
   removeBtn.classList.add("remove_btn");
   div.setAttribute("data-id", book.id);

   paraTitle.textContent = `"${book.title}"`;
   paraAuthor.textContent = book.author;
   paraPages.textContent = `${book.pages} pages`;
   readBtn.textContent = book.read ? "Read" : "Not Read";
   removeBtn.textContent = "Remove";

   div.appendChild(paraTitle);
   div.appendChild(paraAuthor);
   div.appendChild(paraPages);
   btnContainer.appendChild(readBtn);
   btnContainer.appendChild(removeBtn);
   div.appendChild(btnContainer);

   readBtn.addEventListener("click", () => {
      book.read = !book.read;
      readBtn.textContent = book.read ? "Read" : "Not Read";

      if (book.read) {
         readBtn.style.backgroundColor = "rgba(0, 128, 0, 0.500)";
      } else {
         readBtn.style.backgroundColor = "rgba(255, 0, 0, 0.500)";
      }
   });

   removeBtn.addEventListener("click", () => {
      removeBook(book.id);
   });

   return div;
}

function removeBook(id) {
   const bookCard = document.querySelector(`.book_card[data-id="${id}"]`);
   if (bookCard) {
      bookCard.remove();
   }

   myLibrary = myLibrary.filter((obj) => obj.id !== id);
}

// Form validation

// title.value = "";
// author.value = "";
// pages.value = "";
// read.checked = false;

function formValidation() {
   if (title.value === "") {
      console.log("A title is required");
   }
}
