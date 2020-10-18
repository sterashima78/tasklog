import { ref, Ref, readonly } from "vue";
import { Task, TaskStorage } from "/@/domain/Task";

const _tasks: Ref<Task[]> = ref([]);

const addNewTask = (storage: TaskStorage, tasks: Ref<Task[]>) => async (
  name: string
) => {
  if (name === "") return;
  tasks.value = await storage.add({ id: "", name, type: "Check" });
};

const rmTask = (storage: TaskStorage, tasks: Ref<Task[]>) => async (
  name: string
) => {
  if (name === "") return;
  tasks.value = await storage.remove(name);
};

export const useTask = (storage: TaskStorage) => {
  storage.get().then((i) => (_tasks.value = i));
  return {
    removeTask: rmTask(storage, _tasks),
    addNewTask: addNewTask(storage, _tasks),
    tasks: readonly(_tasks),
  };
};
