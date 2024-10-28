import { Duration } from "luxon";

export const toSeconds = (duration: { days: number }) => {
  return Duration.fromObject(duration).toMillis() / 1000;
};

export const toMillis = (duration: { days: number }) => {
  return Duration.fromObject(duration).toMillis();
};
