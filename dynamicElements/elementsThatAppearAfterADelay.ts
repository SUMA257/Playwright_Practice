import { test, expect } from '@playwright/test';

test('wait for async data', async ({ page }) => {
  await page.goto('/dashboard');

  const data = page.getByText('Data loaded successfully');

  await expect(data).toBeVisible();

  await data.click();
});