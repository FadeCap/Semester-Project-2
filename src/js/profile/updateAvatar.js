import {
  API_BASE_URL,
  API_PROFILE_URL,
  bearerToken,
  userName,
} from "../variables/variables.js";

// Function to update the avatar URL
export async function updateProfile(event) {
  event.preventDefault();

  // Grab the avatar URL from the input field
  const avatarUrlInput = document.getElementById("updateAvatarUrl");
  const avatarUrl = avatarUrlInput.value;

  try {
    // Construct the data object to be sent to the API
    const dataObj = {
      avatar: avatarUrl,
    };

    // Send the data object to the API using fetch
    const updateResponse = await fetch(
      `${API_BASE_URL}${API_PROFILE_URL}/${userName}/media`,
      {
        method: "PUT",
        body: JSON.stringify(dataObj),
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    // Check if the update was successful
    if (!updateResponse.ok) {
      throw new Error("Failed to update avatar");
    }

    // Display success message
    alert("Avatar updated successfully");

    // Reload page
    location.reload();
  } catch (error) {
    console.error("Error updating avatar:", error);
    alert("Failed to update avatar. Please try again later.");
  }
}

// Attach event listener to the "Update" button
document
  .getElementById("updateAvatarUrlBtn")
  .addEventListener("click", updateProfile);
