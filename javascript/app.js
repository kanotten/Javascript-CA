document.addEventListener("DOMContentLoaded", async function () {
  const genreSelect = document.getElementById("genre");
  const movieList = document.getElementById("movie-list");

  const genres = await getGenres();
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });

  filterAndRenderList();

  genreSelect.addEventListener("change", filterAndRenderList);

  async function getGenres() {
    const response = await fetch("https://api.noroff.dev/api/v1/square-eyes");
    const data = await response.json();
    const uniqueGenres = [...new Set(data.map((item) => item.genre))];
    return uniqueGenres.filter(Boolean);
  }

  async function filterAndRenderList() {
    const selectedGenre = genreSelect.value.toLowerCase();

    const response = await fetch("https://api.noroff.dev/api/v1/square-eyes");
    const movies = await response.json();

    // Filter movies based on selected genre
    const filteredMovies = movies.filter(
      (movie) => movie.genre.toLowerCase() === selectedGenre,
    );

    // Render the movie list
    renderMovieList(filteredMovies);
  }

  function renderMovieList(movies) {
    movieList.innerHTML = "";

    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      // Clicking on the image opens the movie page
      movieCard.innerHTML = `
                <img class="movie-image" src="${movie.image}" alt="${movie.title}" onclick="openMoviePage('${movie.id}')">
                <h2 class="movie-title">${movie.title}</h2>
                <p class="movie-price">${getPriceDisplay(movie)}</p>
            `;

      movieList.appendChild(movieCard);
    });
  }

  window.openMoviePage = function (movieId) {
    window.location.href = `product.html?id=${movieId}`;
  };

  function getPriceDisplay(movie) {
    if (movie.discountedPrice) {
      return `Price: ${movie.price} (Discounted: ${movie.discountedPrice})`;
    } else {
      return `Price: ${movie.price}`;
    }
  }
});
