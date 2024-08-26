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
const dialog = document.querySelector("dialog");
const showModal = document.querySelector(".show_modal");
const closeModal = document.querySelector("dialog .close_modal");

let myLibrary = [
   {
      title: "Example Book Title",
      author: "Darian Toledo",
      pages: 221,
      read: true,
   },
];

// DIALOG
showModal.addEventListener("click", () => {
   dialog.showModal();
});

closeModal.addEventListener("click", () => {
   dialog.close();
});

// ADD BOOK

addBtn.addEventListener("click", () => {
   if (formValidation() === false) {
      return;
   }

   const newBook = new Book(Date.now(), title.value, author.value, pages.value, read.checked);
   myLibrary.push(newBook);
   addBookToLibrary(newBook);
   dialog.close();
   reset();
});

function reset() {
   title.value = "";
   author.value = "";
   pages.value = "";
   read.checked = false;

   title.placeholder = "Title";
   author.placeholder = "Author";
   pages.placeholder = "# Pages";
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
         readBtn.style.backgroundColor = "rgba(236, 112, 112)";
         
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

function formValidation() {
   let isValid;

   if (title.value === "") {
      title.placeholder = "Enter at least 1char";
      title.classList.add("no_valid_form");
      isValid = false;
   } else {
      title.classList.remove("no_valid_form");
   }

   if (author.value === "") {
      author.placeholder = "Enter at least 1char";
      author.classList.add("no_valid_form");
      isValid = false;
   } else {
      author.classList.remove("no_valid_form");
   }

   if (pages.value === "") {
      pages.placeholder = "Enter a valid number";
      pages.classList.add("no_valid_form");
      isValid = false;
   } else if (pages.value > 10000 || pages.value <= 1) {
      pages.value = "";
      pages.placeholder = "Range is 1 to 10000";
      pages.classList.add("no_valid_form");
      isValid = false;
   } else {
      pages.classList.remove("no_valid_form");
   }

   return isValid;
}

myLibrary.forEach((obj) => addBookToLibrary(obj));
