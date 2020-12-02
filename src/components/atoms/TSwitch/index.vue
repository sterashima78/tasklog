<template>
  <div class="w-48 block">
    <div class="switch-button-control">
      <div class="switch-button" :class="{ enabled: active }" @click="toggle">
        <div class="button"></div>
      </div>
      <div class="switch-button-label">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    active: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    },
  },
  emits: { "update:active": null },
  setup(props, { emit }) {
    return {
      toggle() {
        emit("update:active", !props.active);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.switch-button-control {
  display: flex;
  flex-direction: row;
  align-items: center;

  .switch-button {
    $switch-button-height: 0.9em;
    $switch-button-color: #4d4d4d;
    $switch-button-border-thickness: 2px;
    $switch-transition: all 0.3s ease-in-out;
    $switch-is-rounded: true;

    height: $switch-button-height;
    width: calc(#{$switch-button-height} * 2);
    border: $switch-button-border-thickness solid $switch-button-color;
    box-shadow: inset 0 0 $switch-button-border-thickness 0px
      rgba(0, 0, 0, 0.33);
    border-radius: if($switch-is-rounded, $switch-button-height, 0);
    transition: $switch-transition;

    $button-side-length: calc(
      #{$switch-button-height} - (2 * #{$switch-button-border-thickness})
    );

    cursor: pointer;

    .button {
      height: $button-side-length;
      width: $button-side-length;
      border: $switch-button-border-thickness solid $switch-button-color;
      border-radius: if($switch-is-rounded, $button-side-length, 0);
      background: $switch-button-color;
      transition: $switch-transition;
    }

    &.enabled {
      background-color: $switch-button-color;
      box-shadow: none;

      .button {
        background: white;
        transform: translateX(
          calc(
            #{$button-side-length} + (2 * #{$switch-button-border-thickness})
          )
        );
      }
    }
  }

  .switch-button-label {
    margin-left: 1rem;
  }
}
</style>
