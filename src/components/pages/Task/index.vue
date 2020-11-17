<template>
  <div>
    <h2>Task setting</h2>
    <input v-model="newTask" type="text" />
    <button @click="addNewTask(newTask)">add</button>
    <div v-for="task in tasks" :key="task.name">
      <span style="margin-right: 1em" v-text="task.name" />
      <button @click="removeTask(task.id || '')">削除</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from "vue";
import { useTask } from "/@/compositions/useTask";
import { taskStorageKey } from "/@/infrastracture";
export default defineComponent({
  setup() {
    const storage = inject(taskStorageKey);
    if (storage === undefined) {
      throw new Error("injection fail");
    }
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
