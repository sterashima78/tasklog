import { ref, Ref, computed, DeepReadonly } from "vue";
import { getTaskLog, Task, TaskLog, TaskLogStorage } from "/@/domain/Task";
import { Day } from "/@/domain/Day";

const _taskLogs: Ref<TaskLog[]> = ref([]);

export const useTaskLog = (
  storage: TaskLogStorage,
  tasks: DeepReadonly<Ref<Task[]>>,
  day: Readonly<Ref<Day>>
) => {
  return {
    taskLogs: computed(() =>
      getTaskLog(tasks.value, day.value, _taskLogs.value)
    ),
    async updateLog(taskLog: TaskLog) {
      _taskLogs.value = await storage.save(taskLog);
    },
    refresh: async () => (_taskLogs.value = await storage.get()),
  };
};
