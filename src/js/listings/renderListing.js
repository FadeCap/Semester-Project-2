import fetchData from "../auth/fetchData.js";
import {
  API_BASE_URL,
  API_LISTINGS_URL,
  bearerToken,
  tagParams,
} from "../variables/variables.js";
import { redirectPostById } from "./redirectPostById.js";

export async function renderPosts() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get("q");
    const postSection = document.getElementById("post-section");

    const url = postID
      ? `${API_BASE_URL}${API_LISTINGS_URL}/${postID}`
      : `${API_BASE_URL}${API_LISTINGS_URL}${tagParams}`;
    const postsData = await fetchData(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    let postData = postsData;
    if (!Array.isArray(postsData)) {
      postData = [postsData];
    }

    const clothesPosts = postData.filter((post) =>
      post.tags.includes("clothes"),
    );

    for (let i = 0; i < clothesPosts.length; i++) {
      const endsAtString = clothesPosts[i].endsAt;
      const dateTime = new Date(endsAtString);

      const date = dateTime.toDateString();
      const time = dateTime.toLocaleTimeString();

      // Construct a string of HTML for multiple images
      let imagesHTML = "";
      for (let j = 0; j < clothesPosts[i].media.length; j++) {
        imagesHTML += `<img class="w-100 rounded-4 p-2" src="${
          clothesPosts[i].media[j]
        }" alt="Post image ${j + 1}" />`;
      }

      const bidButton = document.createElement("button");
      bidButton.classList.add("btn", "btn-primary", "mr-2");
      bidButton.textContent = "Bid";
      bidButton.addEventListener("click", (event) => redirectPostById(event));
      bidButton.id = clothesPosts[i].id;

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add(
        "button-container",
        "d-flex",
        "justify-content-center",
        "m-2",
        "gap-3",
      );
      buttonContainer.id = "bidBtn";
      buttonContainer.appendChild(bidButton);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "px-0", "pb-0");
      cardBody.innerHTML = `
        <h3 class="card-text text-center p-3">${clothesPosts[i].title}</h3>
        <div class="post-images">${imagesHTML}</div>
        <div class="p-3">
          <h6>Description:</h6>
          <p class="px-4">${clothesPosts[i].description}</p>
          <h6>Bids on this item:</h6>
          <p class="px-4 text-center">${clothesPosts[i]._count.bids}</p>
          <h6>Bidding ends at:</h6>
          <p> Date: ${date} <br> Time: ${time}</p>
        </div>`;
      cardBody.appendChild(buttonContainer);

      const cardContainer = document.createElement("div");
      cardContainer.classList.add("listings-container", "p-4");
      cardContainer.innerHTML = `
        <div class="card container-lg mt-5">
        </div>`;
      cardContainer.querySelector(".card").appendChild(cardBody);

      postSection.appendChild(cardContainer);
    }
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}
