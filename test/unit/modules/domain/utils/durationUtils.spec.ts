import { toMillis, toSeconds } from "@/modules/domain/utils/durationUtils";

describe("duration utils", () => {
  it("can convert a duration based in days to seconds", () => {
    const duration = { days: 1 };
    expect(toSeconds(duration)).toEqual(24 * 60 * 60);
  });

  it("can convert a duration based in days to milli seconds", () => {
    const duration = { days: 1 };
    expect(toMillis(duration)).toEqual(24 * 60 * 60 * 1000);
  });
});
