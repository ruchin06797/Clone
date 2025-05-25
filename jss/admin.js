const ADMIN_TOKEN = 'your-secure-token'; // Set in wrangler.toml

async function loadContent() {
  const response = await fetch('/api/content');
  return await response.json();
}

async function saveContent(content) {
  await fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_TOKEN}`
    },
    body: JSON.stringify(content)
  });
}

// Render editable content
function renderEditor(content) {
  const editor = document.getElementById('content-editor');
  editor.innerHTML = `
    <textarea id="content-json">${JSON.stringify(content, null, 2)}</textarea>
  `;
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', async () => {
  const content = await loadContent();
  renderEditor(content);
  
  document.getElementById('save-btn').addEventListener('click', async () => {
    try {
      const newContent = JSON.parse(document.getElementById('content-json').value);
      await saveContent(newContent);
      alert('Changes saved successfully!');
    } catch (err) {
      alert('Error saving: ' + err.message);
    }
  });
});