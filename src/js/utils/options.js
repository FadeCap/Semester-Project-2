import * as storage from "../storage/index.mjs";

const jwt = storage.load("jwt");

export const options = {
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
};