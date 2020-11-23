import * as firebase from "./Firebase/";
import * as localStorage from "./LocalStorage";

const obj =
  process.env.STORAGE_TYPE === "localStorage" ? localStorage : firebase;

export const taskLogStorage = obj.storage;
