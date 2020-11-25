import { addTask, Task, TaskStorage, removeTask } from "/@/domain/Task";
import { pipe } from "fp-ts/pipeable";
import { getUser } from "/@/infrastracture/Auth/";
import {
  getFromStorage,
  setStorage,
} from "/@/infrastracture/Providers/LocalStorage";

const set = async (tasks: Task[]) =>
  getUser().then((info) => {
    if (info === undefined) return [];
    setStorage(info.name, "tasks", tasks);
    return tasks;
  });

export const storage: TaskStorage = {
  get: async () =>
    getUser().then((info) => {
      if (info === undefined) return [];
      return pipe(getFromStorage(info.name), (i) => i.tasks || []);
    }),
  add: async (task) =>
    pipe(task, async ({ name, type }) => {
      const tasks = await storage.get();
      return set(addTask(tasks, { id: "", name, type }));
    }),
  remove: async (name: string) => {
    const tasks = await storage.get();
    return pipe(tasks, removeTask(name), set);
  },
};
