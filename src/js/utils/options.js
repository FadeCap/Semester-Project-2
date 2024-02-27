import * as storage from "../storage/index.js";

const jwt = storage.load("jwt");

export const options = {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
};