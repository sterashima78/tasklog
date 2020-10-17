<template>
  <div>
    <h2>Task setting</h2>
    <input type="text" v-model="newTask" />
    <button @click="addNewTask(newTask)">add</button>
    <div v-for="task in tasks" :key="task.name">
      <span v-text="task.name" style="margin-right: 1em"/>
      <button @click="removeTask(task.name)">削除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useTask } from "/@/compositions/useTask";
import { storage } from "/@/infrastracture/Task/LocalStorage";
export default defineComponent({
  setup() {
    const newTask = ref("");
    const { tasks, addNewTask, removeTask } = useTask(storage);
    return {
      addNewTask: (name: string) => {
        addNewTask(name);
        newTask.value = "";
      },
      removeTask,
      newTask,
      tasks,
    };
  },
});
</script>

<style scoped>

</style>