// pages/dashboard-page.js
import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('text=Logout');
    this.accountBalance = page.locator('.balance-value');
    this.recentTransactions = page.locator('table.transaction-table');
    this.addTransactionButton = page.locator('button:has-text("Add")');
    this.notificationBell = page.locator('.notifications');
    this.userAvatar = page.locator('.avatar');
    this.navMenuItems = page.locator('.nav-menu li');
  }

  async getAccountBalance() {
    return await this.accountBalance.textContent();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getRecentTransactionsCount() {
    const rows = this.recentTransactions.locator('tbody tr');
    return await rows.count();
  }

  async addNewTransaction(amount, description) {
    await this.addTransactionButton.click();
    // Assuming there's a modal/form for adding transactions
    // You'll need to inspect actual elements
  }

  async isDashboardLoaded() {
    return await this.accountBalance.isVisible();
  }
}