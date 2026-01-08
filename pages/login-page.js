// pages/login-page.js
export class LoginPage {
  constructor(page) {
    this.page = page;
    // Use more flexible selectors
    this.usernameInput = page.locator('input[type="text"], input[name="username"], #username');
    this.passwordInput = page.locator('input[type="password"], input[name="password"], #password');
    this.loginButton = page.locator('button:has-text("Sign in"), button:has-text("Log In"), button:has-text("Login")');
    this.pageTitle = page.locator('h1, h2, h3, h4').first();
    this.logo = page.locator('img, .logo, svg').first();
  }

  async navigate() {
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async isLoginPageLoaded() {
    const hasInputs = await this.usernameInput.count() > 0 || await this.passwordInput.count() > 0;
    return hasInputs;
  }
}