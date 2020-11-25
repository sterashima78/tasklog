import { Task, TaskLog } from "/@/domain/Task";
import { fromNullable, map, getOrElse } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

export type Schema = {
  id: string;
  tasks: Task[];
  taskLogs: TaskLog[];
};

export const getFromStorage = (name: string): Schema =>
  pipe(
    localStorage.getItem(name),
    fromNullable,
    map(JSON.parse),
    getOrElse(() => ({ id: "", tasks: [], taskLogs: [] }))
  );

export const setStorage = (
  name: string,
  key: keyof Schema,
  value: Schema["id"] | Schema["tasks"] | Schema["taskLogs"]
) =>
  localStorage.setItem(
    name,
    JSON.stringify({ ...getFromStorage(name), [key]: value })
  );
