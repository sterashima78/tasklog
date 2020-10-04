import { ref, Ref, computed, DeepReadonly } from "vue";
import {
  getTaskLog,
  updateTaskLog,
  Task,
  TaskLog,
  addTaskLog,
} from "/@/domain/Task";
import { Day } from "/@/domain/Day";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

const _taskLogs = pipe(
  localStorage.getItem("taskLogs"),
  fromNullable,
  map<string, TaskLog[]>(JSON.parse),
  map<TaskLog[], Ref<TaskLog[]>>(ref),
  getOrElse(() => ref([]) as Ref<TaskLog[]>)
);

export const useTaskLog = (tasks: DeepReadonly<Ref<Task[]>>, day: Readonly<Ref<Day>>) => {
  return {
    taskLogs: computed(() =>
      getTaskLog(tasks.value, day.value, _taskLogs.value)
    ),
    updateLog(taskLog: TaskLog, value: any) {
      _taskLogs.value =
        taskLog.id === undefined
          ? addTaskLog(taskLog.task, value, day.value, _taskLogs.value)
          : updateTaskLog(taskLog.id, value, _taskLogs.value);
      localStorage.setItem("taskLogs", JSON.stringify(_taskLogs.value));
    },
  }
}