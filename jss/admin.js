document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  const adminPanel = document.getElementById('admin-panel');
  const loginBtn = document.getElementById('login-btn');
  const passwordInput = document.getElementById('admin-password');
  const errorMsg = document.getElementById('login-error');

  // Login function
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (passwordInput.value === DB.ADMIN_PASSWORD) {
      loginScreen.style.display = 'none';
      adminPanel.classList.remove('hidden');
      initAdminPanel();
    } else {
      errorMsg.textContent = "Incorrect password!";
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  function initAdminPanel() {
    const form = document.getElementById('add-movie-form');
    const tableBody = document.getElementById('movies-table-body');

    function renderMovies() {
      tableBody.innerHTML = '';
      DB.movies.forEach(movie => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${movie.id}</td>
          <td>${movie.title}</td>
          <td>${movie.category}</td>
          <td>
            <button class="delete-btn" data-id="${movie.id}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          DB.deleteMovie(id);
          renderMovies();
        });
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newMovie = {
        id: DB.movies.length > 0 ? Math.max(...DB.movies.map(m => m.id)) + 1 : 1,
        title: document.getElementById('movie-title').value,
        category: document.getElementById('movie-category').value,
        thumbnail: document.getElementById('movie-thumbnail').value,
        video: document.getElementById('movie-video').value
      };

      DB.addMovie(newMovie);
      form.reset();
      renderMovies();
    });

    renderMovies();
  }
});