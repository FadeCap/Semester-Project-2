import fetchData from "../auth/fetchData.js";
import { API_BASE_URL, API_LISTINGS_URL, bearerToken, tagParams } from "../variables/variables.js";

export async function renderPosts() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const postID = urlParams.get("q");
    const postSection = document.getElementById("post-section");

    const url = postID ? `${API_BASE_URL}${API_LISTINGS_URL}/${postID}` : `${API_BASE_URL}${API_LISTINGS_URL}${tagParams}`;
    const postsData = await fetchData(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    let postData = postsData;
    if (!Array.isArray(postsData)) {
      postData = [postsData];
    }

     const clothesPosts = postData.filter((post) => post.tags.includes("clothes"));

    for (let i = 0; i < clothesPosts.length; i++) {
      const endsAtString = clothesPosts[i].endsAt;
      const dateTime = new Date(endsAtString);

      const date = dateTime.toDateString();
      const time = dateTime.toLocaleTimeString();

      // Construct a string of HTML for multiple images
      let imagesHTML = '';
      for (let j = 0; j < clothesPosts[i].media.length; j++) {
        imagesHTML += `<img class="w-100 rounded p-2" src="${clothesPosts[i].media[j]}" alt="Post image ${j+1}" />`;
      }

      postSection.innerHTML += `<div class="listings-container p-4">
        <div class="card container-lg bg-white-custom mt-5">
          <div class="card-body px-0 pb-0">
            <h3 class="card-text text-center p-3">${clothesPosts[i].title}</h3>
            <div class="post-images">${imagesHTML}</div>
            <div class="p-3">
              <h6>Description:</h6>
              <p class="px-4">${clothesPosts[i].description}</p>
              <h6>Bids on this item:</h6>
              <p class="px-4 text-center">${clothesPosts[i]._count.bids}</p>
              <h6>Bidding ends at:</h6>
              <p> Date: ${date} <br> Time: ${time}</p>
            </div>
            <div id="bidBtn" class="button-container d-flex justify-content-center m-2 gap-3">
              <button class="btn btn-primary mr-2" onclick="getPostByID(event)" id="${clothesPosts[i].id}">Bid</button>
            </div>
          </div>
        </div>
      </div>`;
    }
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}
