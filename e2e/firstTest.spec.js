// const { reloadApp } = require("detox-expo-helpers");

const sleep = (duration) =>
  new Promise((resolve) => setTimeout(() => resolve(), duration));

const login = async () => {
  const email = element(by.id("email"));
  const password = element(by.id("password"));
  const loginBtn = element(by.text("Login"));

  await expect(email).toBeVisible();

  await email.replaceText("test9999@qq.com");
  await password.typeText("111111\n");
  await loginBtn.tap();
};

describe("Example", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.setURLBlacklist([".*firestore.googleapis.com.*"]);
  });

  it("should login successfully", async () => {
    await login();
    await expect(element(by.id("task"))).toBeVisible();
  });
});
