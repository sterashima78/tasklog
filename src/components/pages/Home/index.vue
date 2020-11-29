<template>
  <div class="w-full">
    <div class="flex flex-1 justify-center">
      <button @click="prevDate">prev</button>
      <div v-text="dateString" />
      <button @click="nextDate">next</button>
    </div>
    <ul>
      <li v-for="taskLog in taskLogs" :key="taskLog.task.name">
        <t-switch
          :active="taskLog.value"
          @update:active="updateLog({ ...taskLog, value: !taskLog.value })"
        >
          <span>{{ taskLog.task.name }}</span>
        </t-switch>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, onMounted, inject } from "vue";
import { taskStorageKey, taskLogStorageKey } from "/@/infrastracture";
import {
  fromDate,
  toString,
  Day,
  nextDay,
  prevDay,
  ChangeDay,
} from "/@/domain/Day";
import { pipe } from "fp-ts/pipeable";
import { useTask } from "/@/compositions/useTask";
import { useTaskLog } from "/@/compositions/useTaskLog";
import TSwitch from "/@/components/atoms/TSwitch/index.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    TSwitch,
  },
  props: {
    date: {
      type: Object as PropType<Day>,
      default: () => fromDate(new Date()),
      required: true,
    },
  },
  setup(props) {
    const taskLogStorage = inject(taskLogStorageKey);
    const taskStorage = inject(taskStorageKey);
    if (taskLogStorage === undefined || taskStorage === undefined) {
      throw new Error("inject fail");
    }
    const router = useRouter();
    const { tasks } = useTask(taskStorage);
    const dateString = computed(() => pipe(props.date, toString));
    const { taskLogs, updateLog, refresh } = useTaskLog(
      taskLogStorage,
      tasks,
      computed(() => props.date)
    );
    onMounted(refresh);
    const toPath = (d: Day) => `/log/${d.y}-${d.m}-${d.d}`;
    const navigateDate = (changeDate: ChangeDay) => () =>
      pipe(props.date, changeDate, toPath, router.push);
    return {
      tasks,
      dateString,
      prevDate: navigateDate(prevDay),
      nextDate: navigateDate(nextDay),
      taskLogs,
      updateLog,
    };
  },
});
</script>
