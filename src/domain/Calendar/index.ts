import { Day, toDate } from "../Day";
import { Option } from "fp-ts/Option";
import { pipe } from "fp-ts/pipeable";

type WeekDay = Option<Day>;
type Week = [WeekDay, WeekDay, WeekDay, WeekDay, WeekDay, WeekDay, WeekDay];
type MonthCalendar =
  | [Week, Week, Week, Week]
  | [Week, Week, Week, Week, Week]
  | [Week, Week, Week, Week, Week, Week];

type Month = Omit<Day, "d">;

type CreateCalendar = (m: Month) => MonthCalendar;

// export const createCalendar: CreateCalendar = (m) => {
//   const first = pipe({ ...m, d: 1 }, toDate);
//   const last = pipe({ y: m.y, m: m.m + 1, d: 0 }, toDate);
// };
