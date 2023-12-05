import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeDuration(time: number) {
  dayjs.extend(duration);
  const d = dayjs.duration(time, "milliseconds");
  const f =
    time < 60 * 1000
      ? "ss 秒"
      : time < 60 * 60 * 1000
      ? "mm 分 ss 秒"
      : "hh 小时 mm 分 ss 秒";
  return d.format(f);
}