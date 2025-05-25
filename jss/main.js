document.addEventListener('DOMContentLoaded', () => {
  const categoriesSection = document.querySelector('.categories');
  const videoModal = document.querySelector('.video-modal');
  const closeModal = document.querySelector('.close-modal');
  const modalVideo = document.getElementById('modal-video');

  // Group movies by category
  const categories = [...new Set(DB.movies.map(movie => movie.category))];

  // Display all categories
  categories.forEach(category => {
    const categoryHTML = `
      <div class="category">
        <h2>${category}</h2>
        <div class="movies-row" id="${category.replace(/\s+/g, '-')}"></div>
      </div>
    `;
    categoriesSection.insertAdjacentHTML('beforeend', categoryHTML);
    
    // Add movies to each category
    const moviesInCategory = DB.movies.filter(movie => movie.category === category);
    const row = document.getElementById(category.replace(/\s+/g, '-'));
    
    moviesInCategory.forEach(movie => {
      const movieHTML = `
        <div class="movie" data-id="${movie.id}">
          <img src="${movie.thumbnail}" alt="${movie.title}">
          <div class="movie-overlay">
            <button class="play-btn">▶ Play</button>
          </div>
        </div>
      `;
      row.insertAdjacentHTML('beforeend', movieHTML);
    });
  });

  // Handle play buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('play-btn')) {
      const movieId = parseInt(e.target.closest('.movie').dataset.id);
      const movie = DB.movies.find(m => m.id === movieId);
      
      modalVideo.src = movie.video;
      videoModal.classList.remove('hidden');
    }
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    videoModal.classList.add('hidden');
    modalVideo.pause();
  });
});