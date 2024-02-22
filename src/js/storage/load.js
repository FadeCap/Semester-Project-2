import * as storage from "./index.js";

export const load = (key) => {
  let data = JSON.parse(localStorage.getItem(key));
  if (!data) {
    data = storage.save(key, []);
  }
  return data;
};