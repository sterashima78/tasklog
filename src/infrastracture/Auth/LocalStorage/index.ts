import { GetUser, Login, Logout } from "/@/domain/Auth/index";
import { v4 as uuid } from "uuid";

const LOGIN_USER_KEY = "__loginuser";

const getUserInfo = (username: string) => {
  const data = localStorage.getItem(username);
  if (!data) return undefined;
  try {
    const d = JSON.parse(data);
    localStorage.setItem(LOGIN_USER_KEY, username);
    return {
      id: d.id,
      name: username,
    };
  } catch (error) {
    return undefined;
  }
};

export const getUser: GetUser = () =>
  new Promise((resolve, reject) => {
    const username = localStorage.getItem(LOGIN_USER_KEY);
    if (!username) return resolve(undefined);
    const info = getUserInfo(username);
    return info ? resolve(info) : reject(undefined);
  });

export const login: Login = () =>
  new Promise((resolve, reject) => {
    const username = window.prompt("ユーザ名を入力してください");
    if (!username) return reject(undefined);
    const info = getUserInfo(username);
    const data = localStorage.getItem(username);
    if (info) return resolve(info);
    const id = uuid();
    localStorage.setItem(username, JSON.stringify({ id }));
    localStorage.setItem(LOGIN_USER_KEY, username);
    resolve({
      id,
      name: username,
    });
  });

export const logout: Logout = () =>
  new Promise((resolve) => {
    localStorage.removeItem(LOGIN_USER_KEY);
    resolve();
  });
