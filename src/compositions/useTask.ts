import { ref, Ref, readonly } from "vue";
import { Task, TaskStorage } from "/@/domain/Task";

const _tasks: Ref<Task[]> = ref([])

const addNewTask = (storage: TaskStorage, tasks: Ref<Task[]>) => (name: string) => {
  if (name === "") return;
  tasks.value = storage.add({name, type: "Check"})
};

const rmTask = (storage: TaskStorage, tasks: Ref<Task[]>) => (name: string) => {
  if (name === "") return;
  tasks.value = storage.remove(name)
};

export const useTask = (storage: TaskStorage) => {
  _tasks.value = storage.get()
  return {
    removeTask: rmTask(storage, _tasks),
    addNewTask: addNewTask(storage, _tasks),
    tasks: readonly(_tasks),
  };
};
