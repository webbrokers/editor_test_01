import { test, expect } from '@playwright/test';

test('лендинг загружается и видна CTA-кнопка', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Собирайте кампании/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Начать работу/i })).toBeVisible();
});
