import { login } from "./auth/login.js";
import { register } from "./auth/register.js";


// Register form
loginForm.addEventListener("submit", register);

// Login form
loginForm.addEventListener("submit", login);

