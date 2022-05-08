import {
  formatTime,
  isMorning,
  nextPeriod,
  nextPerson,
  periodLabel,
} from "./report";

describe("report", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("labels: morning", () => {
    jest.useFakeTimers();

    jest.setSystemTime(new Date(2022, 5, 9, 4, 0, 0));
    expect(periodLabel()).toBe("🌞 朝");
    expect(nextPeriod()).toBe("🌛 夜");

    jest.setSystemTime(new Date(2022, 5, 9, 12, 0, 0));
    expect(periodLabel()).toBe("🌞 朝");
    expect(nextPeriod()).toBe("🌛 夜");
  });

  it("labels: night", () => {
    jest.useFakeTimers();

    jest.setSystemTime(new Date(2022, 5, 9, 16, 0, 0));
    expect(periodLabel()).toBe("🌛 夜");
    expect(nextPeriod()).toBe("🌞 明日の朝");

    jest.setSystemTime(new Date(2022, 5, 9, 23, 59, 59));
    expect(periodLabel()).toBe("🌛 夜");
    expect(nextPeriod()).toBe("🌞 明日の朝");
  });

  it("labels: others", () => {
    jest.useFakeTimers();

    jest.setSystemTime(new Date(2022, 5, 9, 24, 0, 0));
    expect(periodLabel()).toBe("時間外");
    expect(nextPeriod()).toBe("🌞 明日の朝");
  });

  it("nextPerson", async () => {
    // FIXME: jest.useFakeTimers + msw is not working...
    expect(await nextPerson()).toBe(
      isMorning() ? "today-night-user" : "tomorrow-morning-user"
    );
  });

  it("formatTime", () => {
    expect(formatTime(1)).toBe("01");
    expect(formatTime(12)).toBe("12");
  });
});
