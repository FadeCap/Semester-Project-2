import { fetchListingDetails } from "./fetchListingDetails.js";
import { displayListingDetails } from "./displayListingData.js";
import { submitBid } from "./submitBid.js";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  const listingDetails = await fetchListingDetails(listingId);
  displayListingDetails(listingDetails);
  console.log(listingDetails);
});
