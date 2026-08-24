const {test,expect} = require('@playwright/test');

test('Calender Validations', async ({page})=>
{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click(); // click on datepicker icon
    await page.locator(".react-calendar__navigation__label").click(); // click on year label
    await page.locator(".react-calendar__navigation__label").click(); // click on year label
    await page.getByText(year).click(); // click on given year
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click(); // click on given month
    await page.locator("//abbr[text()='"+date+"']").click();// click on given date
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for(let i =0; i<inputs.length; i++){
        const value = inputs[i].getAttribute("value");
        expect(value).toEqual(expectedList[i]);
    }





});


