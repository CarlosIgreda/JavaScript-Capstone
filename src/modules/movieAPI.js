const movies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=1a64f9bd5e567bf712f04b2f9f743ac6');
      const displayMovie = response.json();
      return displayMovie;
    } catch (error) {
      return error;
    }
  };
  
  export default movies;