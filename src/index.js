// import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  const $movieCards = document.querySelector('.movie-cards');

  let dataTable = [];
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e69f1af4101d7b0a6dc2c4def7adf831';
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';

  const renderData = (dataTable) => {
    $movieCards.textContent = '';
    dataTable.forEach((data) => {
      const $card = document.createElement('div');
      $card.setAttribute('class', 'card-container');
      const $imgMovies = document.createElement('img');
      const $imgContainer = document.createElement('div');
      $imgContainer.setAttribute('class', 'img-container');
      $imgMovies.setAttribute('src', IMAGE_PATH.concat(data.poster_path));
      $imgMovies.setAttribute('class', 'img');
      $imgContainer.appendChild($imgMovies);
      $card.appendChild($imgContainer);
      $movieCards.appendChild($card);
      const $textContainer = document.createElement('div');
      const $movieTitle = document.createElement('h4');
      const $like = document.createElement('i');
      $movieTitle.textContent = data.title;
      $like.setAttribute('class', 'fa-regular');
      $like.setAttribute('class', 'fa-heart');
      $textContainer.setAttribute('class', 'text-container');
      $textContainer.appendChild($movieTitle);
      $textContainer.appendChild($like);
      $card.appendChild($textContainer);
    });
  };

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dataTable = data.results;
      console.log(dataTable);
      renderData(dataTable);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  getData(API_URL);
});
