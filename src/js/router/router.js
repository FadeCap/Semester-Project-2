import { sortTimeAsc } from "../components/filters/timeFilter.js";
import { carouselHTML } from "../templates/carouselCard.js";
import { options } from "../util/options.js";
import {
  API_BASE_URL,
  API_LISTINGS_URL,
  cardsContainer,
  deleteListingButton,
  editListingForm,
  listingsParams,
  loggedIn,
  pleaseLoginCheck,
} from "../util/variables.js";
import * as storage from "../storage/index.js";
import { buildProfile } from "../profiles/build.js";
import { buildListing } from "../pages/listing.js";
import { editListing } from "../listings/update.js";
import { deleteListing } from "../listings/delete.js";
import { buildListings } from "../pages/listings.js";
import { getListings } from "../listings/read.js";
import { addSortListener } from "../pages/index/sortListeners.js";
import { getQueryParams } from "../util/getQueryParams.js";
import { loopCardData } from "../components/loopCardData.js";

export async function router() {
  const currentPage = location.href;

  if (currentPage.match("index.html") || !currentPage.match(".html")) {
    const data = await getListings(
      `${API_BASE_URL}${API_LISTINGS_URL}/${listingsParams}`,
      options
    );

    const sorted = sortTimeAsc(data);

    addSortListener(data);

    cardsContainer.innerHTML = "";
    carouselContainer.innerHTML = "";

    loopCardData(sorted, 9);

    for (let c = 0; c < data.length; c++) {
      if (c === 4) {
        break;
      }
      carouselContainer.innerHTML += carouselHTML(data[c], c);
    }

    // Error handling
    const error = getQueryParams("error");

    if (error) {
      pleaseLoginCheck.checked = true;
    }
  }

  if (currentPage.match("profile.html")) {
    if (!loggedIn) {
      location.href = "./index.html?error=true";
    } else {
      // QUERY STRINGS
      const name = getQueryParams("name");

      if (!name) {
        // Get user info
        const userInfo = storage.load("user");

        location.href = `../profile/index.html?name=${userInfo.name}`;
      } else {
        buildProfile(name);
      }
    }
  }

  if (currentPage.match("listing.html")) {
    // QUERY STRINGS
    const id = getQueryParams("id");

    if (!id) {
      location.href = `./index.html`;
    } else {
      buildListing(id);
    }

    // Edit listing
    editListingForm.addEventListener("submit", editListing);

    // Delete listing
    deleteListingButton.addEventListener("click", deleteListing);
  }

  if (currentPage.match("listings.html")) {
    // Get the query value
    const query = getQueryParams("query");

    if (!query) {
      location.href = `./index.html`;
    } else {
      buildListings(query);
    }
  }
}
