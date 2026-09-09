const username: string = "testuser";
const loginUrl: string = "https://example.com/login";
const maxRetries: number = 3;
let isLoggedIn: boolean = false;

// Example QA flow
console.log(`Testing login for: ${username}`);

isLoggedIn = true;

console.log(`Login successful: ${isLoggedIn}`);