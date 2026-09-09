import { test, expect } from '@playwright/test';

test('wait for async data', async ({ page }) => {

await page.getByRole('button', { name: 'Add Item' }).click();

const itemName = page.getByLabel('Item Name');

await expect(itemName).toBeVisible();

await itemName.fill('Laptop');

});