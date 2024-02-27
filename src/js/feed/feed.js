import fetchData from "../auth/fetchData.js";
import { API_BASE_URL, API_LISTINGS_URL } from "../variables/variables.js";

const bearerToken = localStorage.getItem("data");
const templatePicture = "../assets/no-image-available.jpg";
const updateModal = document.getElementById("update-modal");

// Redirect to post ID url

window.getPostByID = (e) => {
  window.location.href = `?q=${e.currentTarget.id}`;
};
const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get("q");

const postSection = document.getElementById("post-section");
const render = async (id = null) => {
  const url = id
    ? `${API_BASE_URL}${API_LISTINGS_URL}/${id}`
    : `${API_BASE_URL}${API_LISTINGS_URL}`;
  const postsData = await fetchData(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  let postData = postsData;
  if (!Array.isArray(postsData)) {
    postData = [postsData];
  }


  // Filter posts with the tag "clothes"
  const clothesPosts = postData.filter(post => post.tags.includes('clothes'));

  for (let i = 0; i < clothesPosts.length; i++) {
    postSection.innerHTML += `<div class="feed-container d-flex justify-content-center">
      <div class="card container-lg bg-white-custom mt-5 m-4">
        <div class="card-body px-0 pb-0">
          <p class="card-text p-3">${clothesPosts[i].title}</p>
          <img class="w-100 rounded" onclick=" getPostByID(event)" id="${clothesPosts[i].id}" src="${clothesPosts[i].media ? clothesPosts[i].media : templatePicture}" alt="Posts image" />
          <div id="bidBtn" class="button-container d-flex justify-content-center m-2 gap-3">
            <button class="btn btn-primary mr-2" onclick="updatePost(event, ${clothesPosts[i].id})">Bid</button>
          </div>
        </div>
      </div>
    </div>`;

  }
};


render(postID);

// New post click event and display none when clicked outside or on the cross | Feed page
document
  .getElementById("new-post-button")
  .addEventListener("click", function () {
    document.getElementById("post-modal").style.display = "block";
  });

document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("post-modal").style.display = "none";
});

window.addEventListener("click", function (event) {
  var modal = document.getElementById("post-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document
  .getElementById("post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

// Creating post
const postForm = document.getElementById("post-form");
postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Retrieve form data
  const formData = new FormData(event.target);

  // Extract values from form data
  const title = formData.get("title");
  const description = formData.get("description");
  const tags = formData.get("tags");
  const image = formData.get("image");
  const endsAt = formData.get("endsAt");

  // Construct the request payload
  const requestData = {
    title: title,
    endsAt: endsAt
  };

  
  // Make the POST request
  const postURL = `${API_BASE_URL}${API_LISTINGS_URL}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(requestData),
  };

  try {
    const response = await fetch(postURL, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const responseData = await response.json();
    console.log("Listing created successfully:", responseData);
    
  } catch (error) {
    console.error("Error creating listing:", error.message);
    
  }
});

