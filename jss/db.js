const DB = {
  // Hardcoded password (change this in production!)
  ADMIN_PASSWORD: "netflixadmin123",
  
  movies: JSON.parse(localStorage.getItem('movies')) || [
    {
      id: 1,
      title: "Stranger Things",
      thumbnail: "assets/stranger-things.jpg",
      video: "assets/stranger-things-trailer.mp4",
      category: "Trending Now"
    },
    {
      id: 2,
      title: "The Witcher",
      thumbnail: "assets/witcher.jpg",
      video: "assets/witcher-trailer.mp4",
      category: "Popular on Netflix"
    }
  ],

  saveMovies: function() {
    localStorage.setItem('movies', JSON.stringify(this.movies));
  },

  addMovie: function(movie) {
    this.movies.push(movie);
    this.saveMovies();
  },

  deleteMovie: function(id) {
    this.movies = this.movies.filter(movie => movie.id !== id);
    this.saveMovies();
  }
};