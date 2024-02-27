import { API_BASE_URL, API_REGISTER_URL, loginCheck, loginForm, registerCheck } from "../util/variables.js";
import { errorMessage } from "../components/error.js";
import { successMessage } from "../components/success.js";
import { validateEmail } from "../components/validateEmail.js";
import { timeout } from "../util/timeout.mjs";
import { validateAvatar } from "../components/validateAvatar.js";

export async function register(evt) {
    evt.preventDefault();
  
    // Grab error container
    const errorContainer = evt.target.querySelector(".error-container");
  
    // Assign the inputs from the form to variables
    const [userName, email, password, avatar] = evt.target.elements;
  
    let validatedEmail = "";
  
    if (!validateEmail(email.value)) {
      errorContainer.innerHTML = errorMessage("Invalid email");
    } else {
      errorContainer.innerHTML = "";
      validatedEmail = email.value;
  
      // Validate the avatar field
      const userAvatar = validateAvatar(avatar.value);
  
      // Construct the data object which is to be sent to the API
      const dataObj = JSON.stringify({
        name: userName.value,
        email: validatedEmail,
        password: password.value,
        avatar: userAvatar,
      });
  
      // Send the data object to the API
      try {
        const response = await fetch(`${API_BASE_URL}${API_REGISTER_URL}`, {
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
          }
          if (json.errors[0].code) {
            message = json.errors[0].code;
          }
          errorContainer.innerHTML = errorMessage(`Error ${json.statusCode}, ${json.status}: ${message}`);
        } else {
          errorContainer.innerHTML = successMessage("Registration");
          await timeout(1500);
          registerCheck.checked = false;
          loginCheck.checked = true;
  
          loginForm.querySelector("input[type=email]").value = validatedEmail;
          loginForm.querySelector("input[type=password]").value = password.value;
        }
      } catch (error) {
        console.log(error);
        errorContainer.innerHTML = errorMessage("Oops, something went wrong... " + error);
      }
    }
  }