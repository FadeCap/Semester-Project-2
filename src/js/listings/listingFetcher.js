import fetchData from "../auth/fetchData.js";
import {
  API_BASE_URL,
  API_LISTINGS_URL,
  tagParams,
  bearerToken,
} from "../variables/variables.js";

export async function fetchAndRenderPosts() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const url = tagParams
      ? `${API_BASE_URL}${API_LISTINGS_URL}${tagParams}`
      : `${API_BASE_URL}${API_LISTINGS_URL}`;
    const response = await fetchData(url, options);

    if (!response.ok) {
      throw new Error("Failed to retrieve user information");
    }

    const postsData = await response.json();
    return postsData;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
}
