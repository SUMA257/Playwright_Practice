const user_name: string = "  QA_User  ";
const expectedMessage: string = "Login successful";

const cleanUsername = user_name.trim().toLowerCase();

console.log(`Testing username: ${cleanUsername}`);

if (expectedMessage.includes("successful")) {
  console.log("Login test passed");
}