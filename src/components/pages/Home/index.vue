<template>
  <div class="w-full flex justify-center">
    <div class="w-full md:w-2/3 flex-col items-center">
      <div class="flex justify-center align-center">
        <button
          class="mx-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click="prevDate"
        >
          &lt;
        </button>
        <div
          class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700"
          v-text="dateString"
        />
        <button
          class="mx-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          @click="nextDate"
        >
          &gt;
        </button>
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
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="taskLog in taskLogs"
            :key="taskLog.task.name"
            :class="{ 'bg-yellow-200': taskLog.value }"
          >
            <td class="px-6 py-4 whitespace-nowrap">{{ taskLog.task.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <t-switch
                :active="taskLog.value"
                @update:active="
                  updateLog({ ...taskLog, value: !taskLog.value })
                "
              >
              </t-switch>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
