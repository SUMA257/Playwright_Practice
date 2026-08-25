const {test,expect} = require('@playwright/test');

test('Browser Playwright test',async ({browser}) =>
{
   
   const context = await browser.newContext();
   const page = await context.newPage();
   const userName = page.locator("#username");
   const signIn = page.locator("#signInBtn");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());
   await userName.fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("learning");

   await signIn.click();

     console.log(await page.locator(".card-body a").first().textContent());

});

test('Ui controls', async({page})=>
{
// const context = await browser.newContext();
//    const page = await context.newPage();
   
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator("#username");
   const signIn = page.locator("#signInBtn");
   const dropdown = page.locator("select.form-control");
   console.log(await page.title());
   await userName.fill("rahulshettyacademy");
   await page.locator("[type='password']").fill("learning");
   await dropdown.selectOption("consult");
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   console.log(await page.locator(".radiotextsty").last().isChecked());
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   // await signIn.click();

});

test('child window handle',async ({browser})=>
{
 const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const docLink = page.locator("[href*='documents-request']");
   const [newPage]=await Promise.all(
      [
         context.waitForEvent('page'),
         docLink.click(),
      ]
   )
   const text = await newPage.locator(".red").textContent();
   const arrayText = text.split("@");
   const domain = arrayText[1].split(" ")[0];
   console.log(domain);
   await page.locator("#username").fill(domain);
   console.log(await page.locator("#username").textContent());
}
);




test('Page Playwright test',async ({page}) =>
{
  
   await page.goto("https://google.com");
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});


test('shopping test', async ({page}) => {
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   const userName = await page.locator("#userEmail");
   await userName.fill("sumaraj2608@gmail.com");
   await page.locator("#userPassword").fill("Sweety@08");
   await page.locator("#login").click();
   // await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   




});