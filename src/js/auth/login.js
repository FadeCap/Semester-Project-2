import { API_BASE_URL, API_LOGIN_URL } from "../variables/variables.js";
import { errorMessage } from "../components/error.js";
import { successMessage } from "../components/success.js";
import * as storage from "../storage/index.js";


export async function login(event) {
  event.preventDefault();

  // Assign inputs into variables from the login form
  const [email, password] = event.target.elements;

  // Create data object for the API
  const dataObj = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  // Send data object to the API
  try {
    const response = await fetch(`${API_BASE_URL}${API_LOGIN_URL}`, {
      method: "POST",
      body: dataObj,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    const json = await response.json();

    if (json.errors) {
      let message;
      if (json.errors[0].message) {
        message = json.errors[0].message;
      } else {
        message = json.errors[0].code;
      }
      errorContainer.innerHTML = errorMessage(`Error ${json.statusCode}, ${json.status}: ${message}`);
    } else {
      errorContainer.innerHTML = "";
      errorContainer.innerHTML = successMessage("Login");

      // Save user info
      storage.save("user", {
        name: json.name,
        email: json.email,
        avatar: json.avatar,
        credits: json.credits,
      });

      // Save authentication token
      storage.save("jwt", json.accessToken);

      // Redirect
      await timeout(1000);
      location.href = ".../profile/index.html";
    }
  } catch (error) {
    console.log(error);
    errorContainer.innerHTML = errorMessage("Something went wrong:" + error);
  }
}