<template>
  <t-header v-bind="{ isLogin, login, logout, user }"></t-header>
  <div>
    <template v-if="isLogin">
      <router-view />
    </template>
    <template v-else>Please Login</template>
  </div>
</template>

<script>
import { defineComponent, provide } from "vue";
import {
  taskStorage,
  taskLogStorage,
  taskStorageKey,
  taskLogStorageKey,
} from "./infrastracture";
import { useAuth } from "/@/compositions/useAuth";
import THeader from "/@/components/organisms/THeader/index.vue";
export default defineComponent({
  name: "App",
  components: {
    THeader,
  },
  setup() {
    provide(taskStorageKey, taskStorage);
    provide(taskLogStorageKey, taskLogStorage);
    const { isLogin, logout, login, user } = useAuth();
    return {
      logout,
      isLogin,
      login,
      user,
    };
  },
});
</script>
