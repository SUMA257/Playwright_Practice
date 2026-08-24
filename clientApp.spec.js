const {test,expect} = require('@playwright/test');


test.only('shopping test', async ({page}) => {
   const products = page.locator(".card-body"); // locator for all the products
   const productName = 'ZARA COAT 3'; // product you want to buy
   // go to url 
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//    await page.pause();
   const userName = await page.locator("#userEmail");
   // login using credentials
   await userName.fill("sumaraj2608@gmail.com"); // enter username
   await page.locator("#userPassword").fill("Sweety@08");// enter password
   await page.locator("#login").click();// click on login button
   //wait for products to load
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   //print all the productNames
   console.log(titles);
   const count = await products.count(); // count of the visible products
   console.log(count);
   //add product to cart
   for(let i = 0; i < count; ++i){ // iterate through products
    console.log(await products.nth(0).locator("b").textContent());
    if(await products.nth(i).locator("b").textContent() === productName) //check all the products and match with the pdtName
        {
        await products.nth(i).locator("text = Add To Cart").click(); //if matched click on add to cart button
        break;
    }
   }
//    await page.pause();
   await page.locator("[routerLink*='cart']").click(); // click on cart
   await page.locator("div li").first().waitFor(); //  wait for cart page to open
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); 
   expect(bool).toBeTruthy(); // check if the product which is added to cart visible
   await page.locator("text=Checkout").click(); // checkout the product
   await page.locator("[placeholder*='Country']").pressSequentially("ind"); // type ind letter by letter in select country dropdown
   const dropdown = page.locator(".ta-results"); //locator for  dropdown list
   await dropdown.waitFor(); // wait for the dropdown to visible
   const optionscount = await dropdown.locator("button").count(); // number of items in dropdown
   for (let i= 0; i < optionscount; ++i){ // iterate the dropdown  list
    const text = await dropdown.locator("button").nth(i).textContent(); //get textContent of every item in the dropdown
    if(text === " India"){ // check iftext is equal to india
        await dropdown.locator("button").nth(i).click(); // click if matches
        break;
    }
   }
   // assert  given username is visble
   expect(await page.locator(".user__name [type='text']").first()).toHaveText("sumaraj2608@gmail.com");
   // click on place order button 
   await page.locator('.ta-backdrop').waitFor({ state: 'detached' });

   await page.locator(".btnn.action__submit.ng-star-inserted").click();
   // check if a page opened saying thankyou for the order
   await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
   // extract the orderId
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
   // go to my orders page
   await page.locator("button[routerlink*='myorders']").click();
   // wait for the page to load
   await page.locator("tbody").waitFor();
   // get the rows of the order table
   const rows = await page.locator("tbody tr");
   // check for orderId which is extracted above
   for(let i = 0; i < await rows.count(); ++i){
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click(); // if orderId matched then click
        break;
    }
   }
   const orderDetails = await page.locator(".col-text").textContent(); //get the textContent of the order details
   expect(orderId.includes(orderDetails)).toBeTruthy();// check if the orderId present in the my orders page


});


test('Optimized shopping test', async ({page})=>
{
    const email = "sumaraj2608@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Sweety@08");
    await page.getByRole("button",{name: "Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await products.filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator("div li").first().waitFor(); 
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();
    await page.getByRole("button",{name:'Checkout'}).click();
    await page.getByPlaceholder("select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible(); 

});

