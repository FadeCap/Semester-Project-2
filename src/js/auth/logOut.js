export function logout() {
  localStorage.removeItem("data");
  localStorage.removeItem("name");
  window.location.href = "../login/";
}

document.getElementById("logoutButton").addEventListener("click", function () {
  logout();
});
