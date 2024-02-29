import * as storage from "../storage/index.js"

// API URLs
export const API_BASE_URL = "https://api.noroff.dev/api/v1";
export const API_LISTINGS_URL = "/auction/listings";
export const API_LOGIN_URL = "/auction/auth/login";
export const API_REGISTER_URL = "/auction/auth/register";
export const API_PROFILE_URL = "/auction/profiles";
export const API_AUTH_URL = "/auction/auth/"

//API Params
export const listingsParams = "?_seller=true&_bids=true&_active=true&sort=created&sortOrder=desc";
export const profileParams = "?_listings=true";
export const tagParams = "?_tag=clothes&?_active=true"



//BearerToken
// export const bearerToken = localStorage.getItem("data");
