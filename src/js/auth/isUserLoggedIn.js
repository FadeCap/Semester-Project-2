export function isUserLoggedIn() {
    const checkAuth = localStorage.getItem("jwt");
  
    if (checkAuth.length > 0) {
      return true;
    } else {
      return false;
    }
  }