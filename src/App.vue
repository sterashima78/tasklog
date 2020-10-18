<template>
  <div>
    <h1>Task log</h1>
    <hr />
    <router-link to="/task">Task</router-link> |
    <router-link to="/">Home</router-link>
    <template v-if="isLogin">
      | <button @click="logout">Logout</button> |
      <span>[User: {{ user === undefined ? "名無し" : user.name }}]</span>
    </template>
    <hr />
    <template v-if="isLogin">
      <router-view />
    </template>
    <template v-else>
      <button @click="login">Login</button>
    </template>
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
export default defineComponent({
  name: "App",
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
