import movies from './movieAPI.js';

const displayMovies = async () => {
    const cardContainer = document.getElementById('render-cards');
    const moviesData = await movies();
    const moviesHtml = moviesData.results.map((movie) => `
    <div class="m-card" id="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="poster">
        <div class="card-detail">
            <div class="heart-container">
                <h4 class="movie-title">${movie.title}</h4>
                <i class="fa-regular fa-heart"></i>
            </div>
            <div class="like-number">2 likes</div>
        </div>
        <button class="comment-btn" type="button">Comments</button>
    </div>
    `).join(' ');
    cardContainer.innerHTML = moviesHtml;
};

export default displayMovies;
