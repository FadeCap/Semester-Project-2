import fetchData from "../auth/fetchData.js";
import { API_BASE_URL, bearerToken, API_LISTINGS_URL } from "../variables/variables.js";

export async function createListing(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const description = formData.get("description");
  const tags = formData.get("tags");
  const images = formData.get("images").split(",");
  const endsAt = formData.get("endsAt");

  const requestData = {
    title: title,
    description: description,
    tags: [tags],
    media: images,
    endsAt: endsAt,
  };

  const postURL = `${API_BASE_URL}${API_LISTINGS_URL}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(requestData),
  };

  let response;

  try {
    response = await fetchData(postURL, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Listing created successfully:", responseData);
    window.location.reload();
  } catch (error) {
    console.error("Error creating listing:", error.message);
    if (response && response.status) {
      console.error("Response status:", response.status);
    }
  }
}
