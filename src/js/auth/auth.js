import fetchData from "./fetchData.js";
import { API_AUTH_URL, API_BASE_URL } from "../variables/variables.js";

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  const buttonPressed = event.submitter.id;
  const data = new FormData(event.target);
  const formData = {};
  data.forEach((value, key) => {
    formData[key] = value;
  });
  const [prefix, emailSuffix] = formData.email.split("@");
   const body = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    avatar: formData.avatar
  };
  if (emailSuffix !== "stud.noroff.no") {
    return;
  }
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  if (buttonPressed === "register") {
    options.body = JSON.stringify({
      ...body,
      name: prefix.replaceAll(/\W+/g, "_").trim(),
    });
  } else {
    options.body = JSON.stringify(body);
  }

  const responseData = await fetchData(
    `${API_BASE_URL}${API_AUTH_URL}${buttonPressed}`,
    options
  );
  if (buttonPressed === "register") {
    alert("Account created");
  } else {
    const { accessToken } = responseData;
    localStorage.setItem("data", accessToken);
    window.location.href = "../profile/";
  }
});