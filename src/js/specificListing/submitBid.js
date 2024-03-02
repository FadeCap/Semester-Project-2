import {
  API_BASE_URL,
  API_LISTINGS_URL,
  bearerToken,
} from "../variables/variables.js";

export async function submitBid(listingId, amount) {
  try {
    console.log("Submitting bid for listing ID:", listingId);
    console.log("Bid amount:", amount);

    const response = await fetch(
      `${API_BASE_URL}${API_LISTINGS_URL}/${listingId}/bids`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ amount: amount }),
      },
    );

    console.log("Bid submission response status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to place bid. Status: ${response.status}`);
    }

    // Reload the window after successful bid placement
    window.location.reload();

    alert("Bid placed successfully!");
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Failed to place bid. Are you logged in?");
  }
}
