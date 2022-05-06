import { exportedForTesting } from "./useReport";
import liff from "@line/liff";

describe("fetchProfile", () => {
  beforeAll(() => {
    jest.spyOn(liff, "init").mockResolvedValue(Promise.resolve());
  });

  it("Get the correct profile", async () => {
    jest
      .spyOn(liff, "getProfile")
      .mockResolvedValue({ displayName: "Test", userId: "11111" });
    const profile = await exportedForTesting.fetchProfile(liff, "liff-xxx");
    expect(profile).toEqual({ displayName: "Test", userId: "11111" });
  });

  it("Undefined is returned if profile cannnot be obtained", async () => {
    jest.spyOn(liff, "getProfile").mockResolvedValue(Promise.reject());
    const profile = await exportedForTesting.fetchProfile(liff, "liff-xxx");
    expect(profile).toBeUndefined();
  });
});
