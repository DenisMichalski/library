// Library array
const myLibrary = [
  { title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, isRead: true },

  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: 281,
    isRead: true,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    pages: 180,
    isRead: true,
  },
  { title: 'Moby-Dick', author: 'Herman Melville', pages: 635, isRead: false },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    pages: 1178,
    isRead: false,
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    pages: 309,
    isRead: true,
  },
  { title: 'The Alchemist', author: 'Paulo Coelho', pages: 208, isRead: false },
];

function validateForm() {
  let valid = true;

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');

  // Titel Check
  if (titleInput.value.trim() === '') {
    showError(titleInput, 'title-error', 'Title is required');
    valid = false;
  } else {
    clearError(titleInput, 'title-error');
  }

  // Author Check
  if (authorInput.value.trim() === '') {
    showError(authorInput, 'author-error', 'Author is required');
  } else {
    clearError(authorInput, 'author-error');
  }

  // Pages Check
  if (
    pagesInput.value.trim() === '' ||
    isNaN(pagesInput.value) ||
    pagesInput.value <= 0
  ) {
    showError(pagesInput, 'pages-error', 'Pages must be a positive number');
    valid = false;
  } else {
    clearError(pagesInput, 'pages-error');
  }

  return valid;
}

function showError(input, errorId, message) {
  input.classList.add('invalid');
  document.getElementById(errorId).textContent = message;
}

function clearError(input, errorId) {
  input.classList.remove('invalid');
  document.getElementById(errorId).textContent = '';
}

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
  const libraryContainer = document.getElementById('library');
  libraryContainer.innerHTML = ''; // Clear previous content

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p class="${book.isRead ? 'read-status' : 'not-read-status'}">
            ${book.isRead ? 'Read' : 'Not Read'}
          </p>
          <button onclick="removeBook(${index})" class="remove-btn">Remove</button>
          <button onclick="toggleReadStatus(${index})">
            ${book.isRead ? 'Mark as Unread' : 'Mark as Read'}
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
const newBookBtn = document.getElementById('new-book-btn');
const bookForm = document.getElementById('book-form');

newBookBtn.addEventListener('click', () => {
  bookForm.style.display = bookForm.style.display === 'none' ? 'block' : 'none';
});

// Handle form submission
bookForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  if (!validateForm()) return;

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const isRead = document.getElementById('isRead').checked;

  addBookToLibrary(title, author, pages, isRead);

  // Reset form
  bookForm.reset();
  bookForm.style.display = 'none';
});

// Initial display
displayLibrary();
