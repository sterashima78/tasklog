<template>
  <div class="w-full flex justify-center">
    <div class="w-full md:w-2/3 flex-col items-center">
      <div class="col-span-3 sm:col-span-2">
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="mt-1 flex rounded-md shadow-sm">
            <input
              v-model="newTask"
              type="text"
              class="flex-1 px-2 block w-full border rounded-none rounded-l-md border-gray-300"
            />
            <button
              class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500"
              @click="addNewTask(newTask)"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="task in tasks" :key="task.name">
            <td class="px-6 py-4 whitespace-nowrap" v-text="task.name"></td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="removeTask(task.name || '')">削除</button>
            </td>
          </tr>
        </tbody>
      </table>
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
