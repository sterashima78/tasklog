import * as firebase from "./Firebase/";
import * as localStorage from "./LocalStorage";

const obj =
  //@ts-expect-error
  import.meta.env.VITE_STORAGE_TYPE === "localStorage"
    ? localStorage
    : firebase;

export const getUser = obj.getUser;
export const login = obj.login;
export const logout = obj.logout;
