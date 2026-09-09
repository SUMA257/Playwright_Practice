import { Page } from "@playwright/test";

interface LoginPage {
  page: Page;
  username: string;
  password: string;
}

const loginData: LoginPage = {
  page: {} as Page,
  username: "qa_user",
  password: "Test@123"
};