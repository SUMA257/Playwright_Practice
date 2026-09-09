// Regular function - reusable login action
function login(username: string, password: string): string{
    return `Logging in as ${username}`;
}

//Arrow function 
const searchProduct = (productName: string) :  string => {
    return `Searching for ${productName}`;
}

console.log(login("user", "Test@123"));
console.log(searchProduct("Laptop"));