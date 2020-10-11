import { ref, Ref, readonly } from "vue";
import { addTask, Task, removeTask } from "/@/domain/Task";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

const _tasks: Ref<Task[]> = pipe(
  localStorage.getItem("tasks"),
  fromNullable,
  map(JSON.parse),
  map<Task[], Ref<Task[]>>(ref),
  getOrElse(() => ref([]) as Ref<Task[]>)
);

const addNewTask = (tasks: Ref<Task[]>) => (name: string) => {
  if (name === "") return;
  pipe(addTask(tasks.value, name, "Check"), (t) => {
    localStorage.setItem("tasks", JSON.stringify(t));
    tasks.value = t;
  });
};

const rmTask = (tasks: Ref<Task[]>) => (name: string) => {
  if (name === "") return;
  pipe(tasks.value, removeTask(name), (t) => {
    localStorage.setItem("tasks", JSON.stringify(t));
    tasks.value = t;
  });
};

export const useTask = () => {
  const tasks = readonly(_tasks);
  return {
    removeTask: rmTask(_tasks),
    addNewTask: addNewTask(_tasks),
    tasks,
  };
};
