import { submitBid } from "./submitBid.js";

export function displayListingDetails(listingDetails) {
  const listingContainer = document.getElementById("listing-details-container");

  if (!listingDetails) {
    listingContainer.innerHTML = "<h5>Failed to fetch listing details.</h5>";
    return;
  }

  // Create a new object with the desired structure
  const formattedListing = {
    id: listingDetails.id,
    title: listingDetails.title,
    description: listingDetails.description,
    tags: listingDetails.tags,
    media: listingDetails.media,
    created: listingDetails.created,
    updated: listingDetails.updated,
    endsAt: listingDetails.endsAt,
    _count: {
      bids: listingDetails._count.bids,
    },
    bids: listingDetails.bids.map((bid) => ({
      amount: bid.amount,
      bidderName: bid.bidderName,
    })),
  };
  console.log("formatted", formattedListing);

  const endsAtString = listingDetails.endsAt;
  const dateTime = new Date(endsAtString);

  const date = dateTime.toDateString();
  const time = dateTime.toLocaleTimeString();

  // Now you can use the formattedListing object for rendering
  listingContainer.innerHTML = `
    <div class="card container-lg d-flex-column justify-content-center">
        <h3 class="card-text text-center p-3">${formattedListing.title}</h3>
        <div class="post-images">
            ${formattedListing.media
              .map(
                (imageUrl) =>
                  `<img class="w-100 rounded-4 p-2" src="${imageUrl}"/>`
              )
              .join("")}
        </div>
        <div class="p-3">
            <h6>Description:</h6>
            <p class="px-4">${formattedListing.description}</p>
            <h6>Bids on this item:</h6>
            <p class="px-4 text-center">${formattedListing._count.bids}</p>
            <div class="card w-100 my-4">
                <ul class="list-group">
                    ${formattedListing.bids
                      .map(
                        (bid) => `
                    <li class="list-group-item p-3">Bidder Name: ${bid.bidderName} <br> Amount: ${bid.amount}</li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
            <h6>Bidding ends at:</h6>
            <p> Date:${date} <br> Time:${time}</p>
            <div class="bidBtnContainer d-flex justify-content-center">
                <button id="place-bid-btn" class="btn btn-dark">Place bid</button>
            </div>
        </div>
    </div>
    `;

  const placeBidButton = document.getElementById("place-bid-btn");
  placeBidButton.addEventListener("click", () => {
    const amount = prompt("Enter your bid amount:");
    if (amount !== null && !isNaN(parseFloat(amount)) && isFinite(amount)) {
      submitBid(formattedListing.id, parseFloat(amount));
    } else {
      alert("Invalid bid amount.");
    }
  });
}
