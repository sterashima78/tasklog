import { InjectionKey } from "vue";
import { TaskStorage, TaskLogStorage } from "../domain/Task";

export { storage as taskStorage } from "./Task/Firebase";
export { storage as taskLogStorage } from "./TaskLog/Firebase";

export const taskStorageKey: InjectionKey<TaskStorage> = Symbol.for(
  "TaskStorage"
);
export const taskLogStorageKey: InjectionKey<TaskLogStorage> = Symbol.for(
  "TaskLogStorage"
);
