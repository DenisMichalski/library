// Library array
const myLibrary = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, isRead: true },
  { title: "1984", author: "George Orwell", pages: 328, isRead: false },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    isRead: true,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    isRead: false,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    isRead: true,
  },
  { title: "Moby-Dick", author: "Herman Melville", pages: 635, isRead: false },
  { title: "War and Peace", author: "Leo Tolstoy", pages: 1225, isRead: false },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 277,
    isRead: true,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: 1178,
    isRead: false,
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 309,
    isRead: true,
  },
  { title: "The Alchemist", author: "Paulo Coelho", pages: 208, isRead: false },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    pages: 371,
    isRead: true,
  },
];

// Alternativ: Automatische Konvertierung
myLibrary.forEach((book, index) => {
  if (!(book instanceof Book)) {
    myLibrary[index] = new Book(
      book.title,
      book.author,
      book.pages,
      book.isRead
    );
  }
});


// Book constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Prototype method to toggle read status
Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

// Add book to library
function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayLibrary();
}

// Remove book from library
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

// Display library
function displayLibrary() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p class="${book.isRead ? "read-status" : "not-read-status"}">
            ${book.isRead ? "Read" : "Not Read"}
          </p>
          <button onclick="removeBook(${index})" class="remove-btn">Remove</button>
          <button onclick="toggleReadStatus(${index})">
            ${book.isRead ? "Mark as Unread" : "Mark as Read"}
          </button>
        `;

    libraryContainer.appendChild(bookCard);
  });
}

// Toggle read status
function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayLibrary();
}

// Show/hide form
const newBookBtn = document.getElementById("new-book-btn");
const bookForm = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => {
  bookForm.style.display = bookForm.style.display === "none" ? "block" : "none";
});

// Handle form submission
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const isRead = document.getElementById("isRead").checked;

  addBookToLibrary(title, author, pages, isRead);

  // Reset form
  bookForm.reset();
  bookForm.style.display = "none";
});

// Initial display
displayLibrary();
