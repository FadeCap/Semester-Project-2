import {
  API_BASE_URL,
  API_PROFILE_URL,
  bearerToken,
  userName,
} from "../variables/variables.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Define the options for your request
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    // Fetch user information from the API
    const response = await fetch(
      `${API_BASE_URL}${API_PROFILE_URL}/${userName}`,
      options,
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to retrieve user information");
    }

    // Parse the response JSON data
    const userData = await response.json();

    // Extract the avatar URL from the user data
    const avatarUrl = userData.avatar;
    const profileName = userData.name;
    const credits = userData.credits;

    // Update the src attribute of the avatar image and profileName
    document.getElementById("avatar").src = avatarUrl;
    document.getElementById("profileUsername").textContent = profileName;
    document.getElementById("userCredits").textContent = credits;
  } catch (error) {
    console.error("Error fetching user information:", error);
  }
});
