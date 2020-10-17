<template>
  <div>
    <h1>Task log</h1>
    <hr />
    <router-link to="/task">Task</router-link> |
    <router-link to="/">Home</router-link>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
