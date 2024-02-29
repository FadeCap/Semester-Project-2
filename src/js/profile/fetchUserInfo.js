// fetchUserInfo.js
import { API_BASE_URL, API_PROFILE_URL } from "../variables/variables.js";

export async function fetchUserInfo(bearerToken, userName) {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const response = await fetch(
      `${API_BASE_URL}${API_PROFILE_URL}/${userName}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve user information");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
}
