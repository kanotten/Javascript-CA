const apiUrl = "https://your-api-url.com/books"; // Replace with your actual API URL

async function showAllBooks() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    data.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.textContent = book.title;
      listItem.classList.add("bookItem");
      listItem.addEventListener("click", () => showBookDetails(book.id));
      bookList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

async function showBookDetails(bookId) {
  try {
    const response = await fetch(`${apiUrl}/${bookId}`);
    const book = await response.json();

    const bookDetails = document.getElementById("bookDetails");
    bookDetails.innerHTML = `
      <h2>${book.title}</h2>
      <p>Author: ${book.author}</p>
      <p>Genre: ${book.genre}</p>
      <p>Description: ${book.description}</p>
      <!-- Add more details as needed -->
    `;
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
}

// Initial load - Show first 3 books
showAllBooks();
