import './index.css';

import countLikes from './modules/countLikes.js';

document.addEventListener('DOMContentLoaded', () => {
  const $movieCards = document.querySelector('.movie-cards');

  let movies = [];
  let comments = [];
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=e69f1af4101d7b0a6dc2c4def7adf831';
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original/';
  const INV_API_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HLTRIFVQwjKB70lwmVHy/';

  const addLike = async (id) => {
    try {
      await fetch(INV_API_URL.concat('likes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          item_id: id,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async (id, user, comment) => {
    await fetch(INV_API_URL.concat('comments'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        item_id: id,
        username: user.trim(),
        comment: comment.trim(),
      }),
    });
  };

  const getLikes = async (url, movieid) => {
    try {
      const response = await fetch(url);
      const dataLikes = await response.json();
      const like = dataLikes.find((like) => like.item_id === movieid);
      return like.likes;
    } catch {
      return 0;
    }
  };

  const getComments = async (url) => {
    const response = await fetch(url);
    const dataComments = await response.json();
    return dataComments;
  };

  const renderData = () => {
    const $countMovies = document.querySelector('.count-movies');
    countLikes($countMovies, movies.length);
    const $numberComments = document.querySelector('.number-comments');
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
      $likeIconRegular.addEventListener('click', async () => {
        $likeIconRegular.style.display = 'none';
        $likeIconSolid.style.display = 'block';
        setTimeout(() => {
          $likeIconSolid.style.display = 'none';
          $likeIconRegular.style.display = 'block';
        }, 1000);
        await addLike(movie.id);
        $likeText.textContent = await getLikes(INV_API_URL.concat('likes'), movie.id);
      });
      $likeText.textContent = await getLikes(INV_API_URL.concat('likes'), movie.id);
      const $popUpContainer = document.querySelector('.popup-container');
      const $commentsTable = document.querySelector('.comments-table');
      $commentButton.addEventListener('click', async () => {
        console.log(movie.id);
        comments = JSON.parse(localStorage.getItem(`comments_${movie.id}`)) || [];
        const $popUpMovieTitle = document.querySelector('.popup-movie-title');
        $popUpMovieTitle.textContent = movie.title;
        const $popUpMovieBackdrop = document.querySelector('.popup-movie-backdrop');
        $popUpMovieBackdrop.setAttribute('src', IMAGE_PATH.concat(movie.backdrop_path));
        const $popUpMovieOverview = document.querySelector('.popup-movie-overview-text');
        $popUpMovieOverview.textContent = ` ${movie.overview}`;
        const $popUpMovieRelease = document.querySelector('.popup-movie-release-text');
        $popUpMovieRelease.textContent = ` ${movie.release_date}`;
        $popUpContainer.style.display = 'flex';

        // Obtenemos los comentarios existentes
        comments = await getComments(INV_API_URL.concat(`comments?item_id=${movie.id}`));

        if (comments.length > 0) {
          // Si hay comentarios, los agregamos al contenedor
          $commentsTable.innerHTML = '';
          comments.forEach((comment) => {
            const $commentItem = document.createElement('li');
            $commentItem.setAttribute('class', 'comment-item');
            $commentItem.textContent = `[${comment.creation_date}] ${comment.username} - ${comment.comment}`;
            $commentsTable.appendChild($commentItem);
          });
          $numberComments.textContent = ` (${comments.length})`;
        } else {
          // Si no hay comentarios, mostramos un mensaje indicando que no hay comentarios
          $commentsTable.innerHTML = '<li>No hay comentarios para esta película.</li>';
          $numberComments.textContent = '';
        }

        const $addCommentButton = document.querySelector('.popup-comment-button');
        $addCommentButton.addEventListener('click', async () => {
          console.log(movie.id);
          const $inputName = document.querySelector('.input-name');
          const $inputComment = document.querySelector('.input-comment');
          if ($inputName.value.trim() && $inputComment.value.trim()) {
            await addComment(movie.id, $inputName.value, $inputComment.value);
            $inputName.value = '';
            $inputComment.value = '';

            // Actualizamos los comentarios después de agregar uno nuevo
            comments = await getComments(INV_API_URL.concat(`comments?item_id=${movie.id}`));
            console.log(movie.id);
            $commentsTable.innerHTML = '';
            comments.forEach((comment) => {
              const $commentItem = document.createElement('li');
              $commentItem.setAttribute('class', 'comment-item');
              $commentItem.textContent = `[${comment.creation_date}] ${comment.username} - ${comment.comment}`;
              $commentsTable.appendChild($commentItem);
            });
            $numberComments.textContent = ` (${comments.length})`;
          } else {
            $inputName.value = '';
            $inputComment.value = '';
          }
        });
        const $xIcon = document.querySelector('.x-icon');
        $xIcon.addEventListener('click', () => {
          $popUpContainer.style.display = 'none';
          $numberComments.textContent = '';
          $commentsTable.innerHTML = '';
          comments = [];
        });
      });
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