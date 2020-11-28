import { computed, readonly, Ref, ref } from "vue";
import { login, logout, getUser } from "../infrastracture/Auth/";
import { User } from "/@/domain/Auth";
const user: Ref<User | undefined> = ref(undefined);
getUser()
  .then((u) => (user.value = u))
  .catch(() => console.log("not login"));
export const useAuth = () => {
  return {
    user: readonly(user),
    isLogin: computed(() => user.value !== undefined),
    login: async () => {
      try {
        user.value = await login();
        console.log(user.value);
      } catch (error) {
        console.log(error);
      }
    },
    logout: async () => {
      await logout();
      user.value = undefined;
    },
  };
};
