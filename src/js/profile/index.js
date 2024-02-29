import { fetchUserInfo } from "./fetchUserInfo.js";
import { updateProfile } from "./updateAvatar.js";
import { bearerToken, userName } from "../variables/variables.js";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const userData = await fetchUserInfo(bearerToken, userName);

    if (userData) {
      const { avatar, name, credits } = userData;
      document.getElementById("avatar").src = avatar;
      document.getElementById("profileUsername").textContent = name;
      document.getElementById("userCredits").textContent = credits;
    }
  } catch (error) {
    console.error("Error updating user information:", error);
  }
});
