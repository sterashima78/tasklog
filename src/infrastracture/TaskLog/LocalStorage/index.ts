import {
  TaskLogStorage,
  addTaskLog,
  TaskLog,
  updateTaskLog,
} from "/@/domain/Task";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

const TASKLOG_KEY = "taskLogs";

const set = (tasks: TaskLog[]) => {
  localStorage.setItem(TASKLOG_KEY, JSON.stringify(tasks));
  return tasks;
};

export const storage: TaskLogStorage = {
  get: () =>
    pipe(
      localStorage.getItem(TASKLOG_KEY),
      fromNullable,
      map(JSON.parse),
      getOrElse((): TaskLog[] => [])
    ),
  save: (taskLog) =>
    pipe(
      storage.get(),
      taskLog.id === undefined
        ? addTaskLog.bind(null, taskLog.task, taskLog.value, taskLog.date)
        : updateTaskLog.bind(null, taskLog.id, taskLog.value),
      set
    ),
};
