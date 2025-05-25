async function loadContent() {
  const response = await fetch('/api/content');
  return await response.json();
}

function renderContent(content) {
  const container = document.getElementById('content');
  container.innerHTML = content.map(item => `
    <div class="movie">
      <h2>${item.title}</h2>
      <img src="${item.thumbnail}" alt="${item.title}">
    </div>
  `).join('');
}

// Auto-refresh every 30 seconds
setInterval(async () => {
  const content = await loadContent();
  renderContent(content);
}, 30000);

// Initial load
document.addEventListener('DOMContentLoaded', async () => {
  const content = await loadContent();
  renderContent(content);
});