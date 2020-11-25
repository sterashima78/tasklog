import { InjectionKey } from "vue";
import { TaskStorage, TaskLogStorage } from "/@/domain/Task";

export { taskStorage } from "./Task/";
export { taskLogStorage } from "./TaskLog/";

export const taskStorageKey: InjectionKey<TaskStorage> = Symbol.for(
  "TaskStorage"
);
export const taskLogStorageKey: InjectionKey<TaskLogStorage> = Symbol.for(
  "TaskLogStorage"
);
