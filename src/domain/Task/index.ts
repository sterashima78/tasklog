import { Day, eq } from "../Day/";
import { not } from "fp-ts/function";
import { pipe } from "fp-ts/pipeable";
import { v4 as uuidv4 } from "uuid";
export type TaskType = "Check";

export type Task = {
  name: string;
  type: TaskType;
};

type AddTask = (tasks: Task[], name: string, type?: TaskType) => Task[];

type RemoveTask = (name: string)=> (tasks: Task[]) => Task[];

type EqTask = (t1: Task) => (t2: Task) => boolean;

export type FetchTasks = () => Promise<Task[]>;

export type SaveTasks = (tasks: Task[]) => Promise<Task[]>;

export const addTask: AddTask = (tasks, name, type = "Check") =>
  tasks.find(eqTask({ name, type: "Check" }))
    ? tasks
    : [...tasks, { name, type }];

export const eqTask: EqTask = (t1) => (t2) => t1.name === t2.name;

export const removeTask: RemoveTask = (name)=> (tasks) =>
  tasks.filter(not(eqTask({ name, type: "Check" })));

export type TaskLog = {
  id: string | undefined;
  date: Day;
  task: Task;
  value: any;
};

type GetTaskLog = (
  tasks: Readonly<Task[]>,
  day: Readonly<Day>,
  taskLogs: Readonly<TaskLog[]>
) => TaskLog[];

type AddTaskLog = (
  task: Readonly<Task>,
  value: Readonly<any>,
  day: Readonly<Day>,
  taskLogs: Readonly<TaskLog[]>
) => TaskLog[];

type UpdateTaskLog = (
  id: Readonly<string>,
  value: Readonly<any>,
  taskLogs: Readonly<TaskLog[]>
) => TaskLog[];

type EqTaskLog = (t1: Readonly<TaskLog>) => (t2: Readonly<TaskLog>) => boolean;

export type FetchTaskLogs = () => Promise<Required<TaskLog>[]>;

export type SaveTaskLogs = (
  tasklogs: Readonly<TaskLog[]>
) => Promise<TaskLog[]>;

const createId = () => uuidv4();

export const eqTaskLog: EqTaskLog = (t1) => (t2) =>
  (!!t1.id && !!t2.id && t1.id === t2.id) ||
  (pipe(t1.task, eqTask(t2.task)) && pipe(t1.date, eq(t2.date)));

const toTaskLog = (date: Readonly<Day>, tasks: Readonly<Task[]>) => (
  taskLogs: TaskLog[]
): TaskLog[] =>
  tasks.reduce((tLog, t): TaskLog[] => {
    const a = taskLogs.find(({ task }) => task.name === t.name);
    if (a === undefined) {
      return [
        ...tLog,
        {
          id: undefined,
          date,
          task: { ...t },
          value: false,
        },
      ];
    } else {
      return [...tLog, a];
    }
  }, [] as TaskLog[]);

export const getTaskLog: GetTaskLog = (tasks, day, taskLogs) =>
  pipe(
    taskLogs,
    (i) => i.filter(({ date }) => eq(date)(day)),
    toTaskLog(day, tasks)
  );

export const addTaskLog: AddTaskLog = (task, value, day, taskLogs) => [
  ...taskLogs,
  {
    id: createId(),
    task: { ...task },
    value: value,
    date: { ...day },
  },
];

export const updateTaskLog: UpdateTaskLog = (logId, value, tasklogs) => {
  const t = tasklogs.find(({ id }) => id === logId);
  return !!t
    ? [
        ...tasklogs.filter(not(eqTaskLog(t))),
        {
          ...t,
          value,
        },
      ]
    : tasklogs.slice();
};
