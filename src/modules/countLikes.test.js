import countLikes from './countLikes.js';

describe('countLikes', () => {
  test('adds the number of movies to the count', () => {
    // Arrange
    const countMovies = {
      textContent: 'Number of Movies',
    };
    const moviesLength = 5;

    // Act
    countLikes(countMovies, moviesLength);

    // Assert
    expect(countMovies.textContent).toBe('Number of Movies (5)');
  });
});