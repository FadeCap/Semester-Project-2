export function isUserLoggedIn() {
    const checkAuth = localStorage.getItem("data");
  
    if (checkAuth && checkAuth.length > 0) {
      return true;
    } else {
      return false;
    }
  }