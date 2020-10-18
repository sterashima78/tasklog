import { addTask, Task, TaskStorage, removeTask } from "/@/domain/Task";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

const TASK_KEY = "tasks";

const set = (tasks: Task[]) => {
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  return tasks;
};

export const storage: TaskStorage = {
  get: async () =>
    pipe(
      localStorage.getItem(TASK_KEY),
      fromNullable,
      map(JSON.parse),
      getOrElse((): Task[] => [])
    ),
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
