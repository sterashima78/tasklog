<template>
  <div>
    <h1>Task log</h1>
    <div>
      <h2>Task setting</h2>
      <input type="text" v-model="newTask" />
      <button @click="addNewTask(newTask)">add</button>
      <p v-for="task in tasks" :key="task.name" v-text="task.name" />
    </div>
    <hr />
    <div v-text="date" />
    <button @click="prevDate">prev</button>
    <button @click="nextDate">next</button>
    <ul>
      <li v-for="taskLog in taskLogs" :key="taskLog.task.name">
        <t-switch
          :active="taskLog.value"
          @update:active="updateLog(taskLog, !taskLog.value)"
        >
          <span>{{ taskLog.task.name }}</span>
        </t-switch>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { fromDate, toString, Day, nextDay, prevDay } from "/@/domain/Day";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";
import { useTask } from "/@/compositions/useTask";
import { useTaskLog } from "/@/compositions/useTaskLog";
import TSwitch from "/@/components/atoms/TSwitch/index.vue";
export default defineComponent({
  components: {
    TSwitch,
  },
  setup() {
    const newTask = ref("");
    const { tasks, addNewTask } = useTask();
    const d = ref(fromDate(new Date()));
    const date = computed(() => pipe(d.value, toString));
    const { taskLogs, updateLog } = useTaskLog(tasks, d);
    const prevDate = () => (d.value = pipe(d.value, prevDay));
    const nextDate = () => (d.value = pipe(d.value, nextDay));
    return {
      addNewTask: (name: string) => {
        addNewTask(name);
        newTask.value = "";
      },
      newTask,
      date,
      tasks,
      prevDate,
      nextDate,
      taskLogs,
      updateLog,
    };
  },
});
</script>

<style scoped></style>
