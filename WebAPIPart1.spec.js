const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail:"sumaraj2608@gmail.com",userPassword:"Sweety@08"}; 
const orderPayLoad = {orders: [{country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8"}]};
// let token;
// let orderId;

let response;

test.beforeAll( async()=>
{
    //login api 
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
 
});

// test.beforeEach(()=>
// {
// });

test('Api Place the order', async ({page})=>
{
    //   expect(token).toBeTruthy();
    await page.addInitScript((value) => {

      window.localStorage.setItem('token',value);

    }, response.token );
    // const email = "sumaraj2608@gmail.com";
    // const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.pause();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
    // const products = page.locator(".card-body");
    // await page.getByPlaceholder("email@example.com").fill(email);
    // await page.getByPlaceholder("enter your passsword").fill("Sweety@08");
    // await page.getByRole("button",{name: "Login"}).click();
    // await page.waitForLoadState('networkidle');
    const rows = await page.locator("tbody tr");
       await page.locator("tbody").waitFor();

    for(let i =0; i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // console.log(rowOrderId);
        if(response.orderId.includes(rowOrderId)){
            // console.log(orderId);
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    // await page.pause();
    const orderIdDetails =  await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.locator(".card-body b").first().waitFor();
    // await products.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
    // await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    // await page.locator("div li").first().waitFor(); 
    // await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    // await page.getByRole("button",{name:'Checkout'}).click();
    // await page.getByPlaceholder("select Country").pressSequentially("ind");
    // await page.getByRole("button",{name:"India"}).nth(1).click();
    // await page.getByText("PLACE ORDER").click();

    // await expect(page.getByText("Thankyou for the order.")).toBeVisible(); 

});



