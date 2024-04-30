document.addEventListener("DOMContentLoaded", async function () {
    const movieList = document.getElementById("movies-list");

    function getPriceDisplay(movie) {
        if (movie.discountedPrice) {
            return `Price: ${movie.price} (Discounted: ${movie.discountedPrice})`;
        } else {
            return `Price: ${movie.price}`;
        }
    }

    function renderMovieList(movies) {
        movieList.innerHTML = "";

        movies.forEach((movie) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");

            // Clicking on the image opens the movie page
            movieCard.innerHTML = `
                    <img class="movie-image" src="${movie.image}" alt="${movie.title
                }" onclick="openMoviePage('${movie.id}')">
                    <h2 class="movie-title">${movie.title}</h2>
                    <p class="movie-price">${getPriceDisplay(movie)}</p>
                `;

            movieList.appendChild(movieCard);
        });
    }

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    renderMovieList(cartItems)

    localStorage.clear();

})
