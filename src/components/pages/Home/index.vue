<template>
  <div>
    <div v-text="dateString" />
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
import { computed, defineComponent, PropType, ref, readonly } from "vue";
import { fromDate, toString, Day, nextDay, prevDay } from "/@/domain/Day";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
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
      default: ()=> fromDate(new Date()),
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const { tasks } = useTask();
    const dateString = computed(() => pipe(props.date, toString));
    const { taskLogs, updateLog } = useTaskLog(tasks, computed(()=> props.date));
    const prevDate = () => {
      const d = pipe(props.date, prevDay)
      router.push(`/log/${d.y}-${d.m}-${d.d}`)
    };
    const nextDate = () => {
      const d = pipe(props.date, nextDay)
      router.push(`/log/${d.y}-${d.m}-${d.d}`)
    };
    return {
      tasks,
      dateString,
      prevDate,
      nextDate,
      taskLogs,
      updateLog,
    };
  },
});
</script>

<style scoped></style>
