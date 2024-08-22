const { test, expect } = require('@playwright/test');

const UserType = {
  Standard: 'standard_user',
  Locked_Out: 'locked_out_user',
  Problem: 'problem_user',
  Performance_Glitch: 'performance_glitch_user',
  Error: 'error_user',
  Visual: 'visual_user',
}

const pageUrl = 'https://www.saucedemo.com/';
const username_input = '[data-test="username"]';
const password_input = '[data-test="password"]';
const login_button = '[data-test="login-button"]';
const primary_header = '[data-test="primary-header"]';
const primary_header_text = 'Swag Labs';

async function navigateAndLoginToSauceDemo(page, username){
  await page.goto(pageUrl);
  await page.locator(username_input).click();
  await page.locator(username_input).fill(username);
  await page.locator(password_input).click();
  await page.locator(password_input).fill('secret_sauce');
  await page.locator(login_button).click();
}

test('can login as a standard user', async ({ page }) => {
  await navigateAndLoginToSauceDemo(page, UserType.Standard);
  await expect(page.locator(primary_header)).toContainText(primary_header_text);
});

test('has 6 elements in the shop', async ({ page }) => {
  await navigateAndLoginToSauceDemo(page, UserType.Standard);
  await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
});

test('can logout from the page', async ({ page }) => {
  await navigateAndLoginToSauceDemo(page, UserType.Standard);
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page.locator('[data-test="login-container"] div').filter({ hasText: 'Login' }).first()).toBeVisible();
});

test('error on login with incorrect data', async ({ page }) => {
  await page.goto(pageUrl);
  await page.locator(login_button).click();
});