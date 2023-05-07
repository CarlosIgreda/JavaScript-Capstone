document.addEventListener('DOMContentLoaded', () => {
  const $movieCards = document.querySelector('.movie-cards');

  let movies = [];
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e69f1af4101d7b0a6dc2c4def7adf831';
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';

  const renderData = () => {
    const $countMovies = document.querySelector('.count-movies');
    $countMovies.textContent += ` (${movies.length})`;
    movies.forEach(async (movie) => {
      const $card = document.createElement('div');
      $card.setAttribute('class', 'card-container');
      const $imgMovies = document.createElement('img');
      const $imgContainer = document.createElement('div');
      $imgContainer.setAttribute('class', 'img-container');
      $imgMovies.setAttribute('src', IMAGE_PATH.concat(movie.poster_path));
      $imgMovies.setAttribute('class', 'img');
      $imgContainer.appendChild($imgMovies);
      $card.appendChild($imgContainer);
      $movieCards.appendChild($card);
      const $infoContainer = document.createElement('div');
      const $textContainer = document.createElement('div');
      const $commentLikeContainer = document.createElement('div');
      const $commentButton = document.createElement('button');
      const $likeContainer = document.createElement('span');
      $likeContainer.setAttribute('class', 'like-container');
      const $likeText = document.createElement('p');
      $commentButton.setAttribute('class', 'comment-btn');
      $commentButton.setAttribute('type', 'button');
      $commentButton.textContent = 'Comment';
      $commentLikeContainer.setAttribute('class', 'comment-like-container');
      const $movieTitle = document.createElement('h4');
      $movieTitle.setAttribute('class', 'movie-title');
      const $likeIconRegular = document.createElement('i');
      const $likeIconSolid = document.createElement('i');
      $movieTitle.textContent = movie.title;
      $likeIconRegular.setAttribute('class', 'fa-regular fa-heart like');
      $likeIconSolid.setAttribute('class', 'fa-solid fa-heart like2');
      $likeIconSolid.setAttribute('style', 'display: none;');
      $textContainer.setAttribute('class', 'text-container');
      $infoContainer.setAttribute('class', 'info-container');
      $textContainer.appendChild($movieTitle);
      $commentLikeContainer.appendChild($commentButton);
      $likeContainer.appendChild($likeText);
      $likeContainer.appendChild($likeIconRegular);
      $likeContainer.appendChild($likeIconSolid);
      $commentLikeContainer.appendChild($likeContainer);
      $infoContainer.appendChild($textContainer);
      $infoContainer.appendChild($commentLikeContainer);
      $card.appendChild($infoContainer);
    });
  };

  const getMovies = async (url) => {
    const response = await fetch(url);
    const dataMovies = await response.json();
    movies = dataMovies.results;
    renderData();
  };

  getMovies(API_URL);
});
