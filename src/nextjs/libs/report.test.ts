import {
  DayOfWeek,
  formatTime,
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

  it("nextPerson", () => {
    jest.useFakeTimers();

    const roster = [
      ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"],
      ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6"],
    ];
    // SaturDay(6) night
    let mockDate = new Date(2022, 5 - 1, 7, 20, 0, 0);
    jest.setSystemTime(mockDate);
    expect(nextPerson(mockDate.getDay() as DayOfWeek, roster)).toBe("1-1");

    // SunDay(0) morning
    mockDate = new Date(2022, 5 - 1, 8, 10, 0, 0);
    jest.setSystemTime(mockDate);
    expect(nextPerson(mockDate.getDay() as DayOfWeek, roster)).toBe("2-1");
  });

  it("formatTime", () => {
    expect(formatTime(1)).toBe("01");
    expect(formatTime(12)).toBe("12");
  });
});
