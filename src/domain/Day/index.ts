import { pipe } from "fp-ts/pipeable";

export type Day = {
  y: number;
  m: number;
  d: number
}

type FromDate = (d: Date) => Day
type ToDate = (d: Day) => Date
type ToString = (d: Day) => string
type FromString = (str: string) => Day
type Eq = (d1: Day) => (d2: Day) => boolean

type NextDay = (d: Day) => Day
type PreviousDay = (d: Day) => Day


export const fromDate: FromDate = (d) => ({
  y: d.getFullYear(),
  m: d.getMonth() + 1,
  d: d.getDate()
})

export const toDate: ToDate = (d)=> new Date(d.y, d.m - 1, d.d)

export const fromString: FromString = (str)=> {
  const date = str.split("-").map(x=> parseInt(x, 10))
  if(date.length < 3 && !isNaN(date[0]) && !isNaN(date[1]) && !isNaN(date[2])) return fromDate(new Date())
  return {
    y: date[0],
    m: date[1],
    d: date[2]
  }
} 

export const toString: ToString = (d) => {
  const dayTemplate = ["日", "月", "火", "水", "木", "金", "土"];
  const day = dayTemplate[toDate(d).getDay()]
  return `${d.y}/${d.m}/${d.d} (${day})`
}

export const eq: Eq = (d1) => (d2) => d1.d === d2.d && d1.m === d2.m && d1.y === d2.y
export const nextDay: NextDay = (d)=> pipe({...d, d: d.d + 1}, toDate, fromDate)

export const prevDay: PreviousDay = (d)=> pipe({...d, d: d.d - 1}, toDate, fromDate)
