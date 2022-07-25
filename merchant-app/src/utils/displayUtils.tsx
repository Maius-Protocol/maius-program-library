import { fromUnixTime, intlFormat } from "date-fns";

export const displayTime = (time: number) => {
  return intlFormat(fromUnixTime(time), {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
