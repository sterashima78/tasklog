import { RouteLocation } from "vue-router";
import Index from "./components/pages/Home/index.vue";
import Task from "./components/pages/Task/index.vue";
import { fromDate, fromString } from "/@/domain/Day";
export const routes = [
  {
    path: "/",
    component: Index,
    props: {
      date: fromDate(new Date()),
    },
  },
  {
    path: "/log/:day",
    component: Index,
    props: (route: RouteLocation) => ({
      date:
        typeof route.params.day === "string"
          ? fromString(route.params.day)
          : fromDate(new Date()),
    }),
  },
  {
    path: "/task",
    component: Task,
  },
];
