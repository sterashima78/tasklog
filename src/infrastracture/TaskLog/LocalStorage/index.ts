import {
  TaskLogStorage,
  addTaskLog,
  TaskLog,
  updateTaskLog,
} from "/@/domain/Task";
import { pipe } from "fp-ts/pipeable";
import { getUser } from "/@/infrastracture/Auth/";
import {
  getFromStorage,
  setStorage,
} from "/@/infrastracture/Providers/LocalStorage";

const set = async (tasks: TaskLog[]) =>
  getUser().then((info) => {
    if (info === undefined) return [];
    setStorage(info.name, "taskLogs", tasks);
    return tasks;
  });

export const storage: TaskLogStorage = {
  get: async () =>
    getUser().then((info) => {
      if (info === undefined) return [];
      return pipe(getFromStorage(info.name), (i) => i.taskLogs || []);
    }),
  save: async (taskLog) => {
    const taskLogs = await storage.get();
    console.log(taskLogs);
    return pipe(
      taskLogs,
      taskLog.id === undefined
        ? addTaskLog.bind(null, taskLog.task, taskLog.value, taskLog.date)
        : updateTaskLog.bind(null, taskLog.id, taskLog.value),
      set
    );
  },
};
