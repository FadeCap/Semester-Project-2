import fetchData from "../auth/fetchData.js";
import * as storage from "../storage/index.js";
import { API_BASE_URL, API_PROFILE_URL } from "../variables/variables.js";

// Function to fetch user information
async function getUserInfo() {
  try {
    // Fetch user information from the API
    const response = await fetchData(`${API_BASE_URL}${API_PROFILE_URL}`);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to retrieve user information');
    }
    
    // Parse the response JSON data
    const userData = await response.json();
    
    // Extract the username from the user data
    const username = userData.name;
    
    // Return the username
    return username;
  } catch (error) {
    console.error('Error fetching user information:', error);
    // Handle errors gracefully
    return null;
  }
}

// Function to update the avatar URL
export async function updateProfile(event) {
  event.preventDefault();

  // Grab form elements
  const [img] = event.target.elements;

  // Get the auth token
  const bearerToken = storage.get("data");

  try {
    // Get the username dynamically
    const username = await getUserInfo();

    // Construct the data object to be sent to the API
    const dataObj = {
      avatar: img.value,
    };

    // Send the data object to the API using fetchData
    const response = await fetchData(
      `${API_BASE_URL}${API_PROFILE_URL}/${username}/media`,
      {
        method: "PUT",
        body: JSON.stringify(dataObj),
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    // Handle response
    if (!response.ok) {
      throw new Error('Failed to update avatar');
    }

    // Display success message
    alert('Avatar updated successfully');

    // Reload the page or perform any other necessary actions
    location.reload();
  } catch (error) {
    console.error('Error updating avatar:', error);
    alert('Failed to update avatar. Please try again later.');
  }
}
