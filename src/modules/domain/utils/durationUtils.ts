import { Duration } from "luxon";

export const toMillis = (duration: { days: number }) => {
  return Duration.fromObject(duration).toMillis();
};
