import { test, expect } from "@playwright/test";

test("user can log in", async ({ page }) => {
  await page.goto("https://example.com/login");

  await page.locator("#username").fill("qa_user");
  await page.locator("#password").fill("Test@123");
  await page.locator("#login").click();

  await expect(page).toHaveTitle("Dashboard");
});