console.log("Admin script loaded");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  
  const loginScreen = document.getElementById('login-screen');
  const adminPanel = document.getElementById('admin-panel');
  const loginBtn = document.getElementById('login-btn');
  const passwordInput = document.getElementById('admin-password');
  const errorMsg = document.getElementById('login-error');

  if (!loginBtn || !passwordInput) {
    console.error("Essential elements missing!");
    return;
  }

  console.log("All elements found");

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Login attempt with password:", passwordInput.value);
    
    if (passwordInput.value === DB.ADMIN_PASSWORD) {
      console.log("Password correct");
      loginScreen.style.display = 'none';
      adminPanel.classList.remove('hidden');
      initAdminPanel();
    } else {
      console.log("Password incorrect");
      errorMsg.textContent = "Incorrect password!";
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  function initAdminPanel() {
    console.log("Initializing admin panel");
    // ... rest of your admin panel code
  }
});