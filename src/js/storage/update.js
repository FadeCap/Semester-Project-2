import * as storage from "./index.js"

export function update(key, property, value) {
    const obj = storage.load(key);
    obj[property] = value;
    storage.save(key, obj);
  }