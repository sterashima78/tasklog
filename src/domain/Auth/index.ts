export type User = {
  id: string;
  name: string;
};
export type UserInfo = { name: string; id: string };
export type GetUser = () => Promise<UserInfo | undefined>;
export type Logout = () => Promise<void>;
export type Login = () => Promise<UserInfo | undefined>;
