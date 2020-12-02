<template>
  <t-header
    class="w-full fixed"
    v-bind="{ isLogin, login, logout, user }"
  ></t-header>
  <div class="h-full flex bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
    <template v-if="isLogin">
      <router-view />
    </template>
    <template v-else>
      <div class="flex h-full w-full items-center justify-center">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Please Login
            </h2>
          </div>
          <form class="mt-8 space-y-6" action="#" method="POST">
            <div>
              <button
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="login"
              >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Heroicon name: lock-closed -->
                  <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
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
