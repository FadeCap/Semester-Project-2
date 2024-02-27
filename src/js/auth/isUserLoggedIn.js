export function isUserLoggedIn() {
    const checkAuth = localStorage.getItem("jwt");
  
    if (checkAuth && checkAuth.length > 0) {
      return true;
    } else {
      return false;
    }
  }