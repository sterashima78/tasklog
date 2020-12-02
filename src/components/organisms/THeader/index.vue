<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <t-menu-button
            :is-open="menuIsOpen"
            :toggle="() => (menuIsOpen = !menuIsOpen)"
          />
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <span class="text-white font-bold text-xl">TaskLog</span>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <router-link
                to="/"
                class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900"
                >Home</router-link
              >
              <router-link
                to="/task"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                >Task</router-link
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <t-drop-down v-if="isLogin">
            <template #activator="{ toggle }">
              <button
                id="user-menu"
                class="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-haspopup="true"
                @click="toggle"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt=""
                />
              </button>
            </template>
            <span
              class="block font-bold w-full px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              >User: {{ user === undefined ? "名無し" : user.name }}</span
            >
            <button
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              @click="logout"
            >
              Sign out
            </button>
          </t-drop-down>
          <template v-else>
            <button
              class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white"
              @click="login"
            >
              Login
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuIsOpen" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
          >Home</router-link
        >
        <router-link
          to="/task"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >Task</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { User, Logout, Login } from "/@/domain/Auth";
import TMenuButton from "./components/TMenuButton/index.vue";
import TDropDown from "/@/components/atoms/TDropDown/index.vue";
export default defineComponent({
  components: {
    TMenuButton,
    TDropDown,
  },
  props: {
    isLogin: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: true,
    },
    login: {
      type: Function as PropType<Login>,
      dafault: () => Promise.resolve(),
      required: true,
    },
    logout: {
      type: Function as PropType<Logout>,
      dafault: () => Promise.resolve(),
      required: true,
    },
    user: {
      type: Object as PropType<User | undefined>,
      default: undefined,
    },
  },
  setup() {
    const menuIsOpen = ref(true);
    return {
      menuIsOpen,
    };
  },
});
</script>
