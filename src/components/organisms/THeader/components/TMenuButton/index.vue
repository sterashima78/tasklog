<template>
  <button
    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    aria-expanded="false"
    @click="toggle"
  >
    <span class="sr-only">Open main menu</span>
    <!-- Icon when menu is closed. -->
    <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          -->
    <svg
      v-if="!isOpen"
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
    <!-- Icon when menu is open. -->
    <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          -->
    <svg
      v-else
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    toggle: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
});
</script>
