import { addTask, Task, TaskStorage, removeTask } from "/@/domain/Task";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

const TASK_KEY = "tasks";

const set = (tasks: Task[])=> {
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks))
  return tasks;
}

export const storage: TaskStorage = {
  get: () =>
    pipe(
      localStorage.getItem(TASK_KEY),
      fromNullable,
      map(JSON.parse),
      getOrElse((): Task[] => [])
    ),
  add: (task)=> pipe(
    task,
    ({name, type})=> addTask(storage.get(), name, type),
    set
  ),
  remove: (name: string)=> pipe(
    storage.get(),
    removeTask(name),
    set
  )
};
