

function logout() {
    removeKey("token")
    removeKey("profile")
  }
  
  document.getElementById("logoutButton").addEventListener("click", function () {
    logout();
  });