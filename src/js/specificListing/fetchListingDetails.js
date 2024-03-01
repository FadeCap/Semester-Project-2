import { API_BASE_URL, API_LISTINGS_URL, bearerToken, listingsParams } from "../variables/variables.js";

export async function fetchListingDetails(listingId) {
    try {
        const response = await fetch(`${API_BASE_URL}${API_LISTINGS_URL}/${listingId}${listingsParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch listing details. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching listing details:', error);
        return null;
    }
}
