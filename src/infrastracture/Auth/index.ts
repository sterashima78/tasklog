import * as firebase from "./Firebase/";
import * as localStorage from "./LocalStorage";
export type GetUser = () => Promise<{ name: string; id: string } | undefined>;
export type Logout = () => Promise<void>;
export type Login = () => Promise<{ name: string; id: string } | undefined>;

const obj =
  process.env.STORAGE_TYPE === "localStorage" ? localStorage : firebase;

export const getUser = obj.getUser;
export const login = obj.login;
export const logout = obj.logout;
