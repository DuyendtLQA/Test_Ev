const { BasePage } = require('./base.page')

class Navigation extends BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
     constructor(page) {
        super(page)
        // Navigation Menu
        this.UTILITIES_MAIN_ITEM = this.findElement("//nav[@class='header__nav-main']//a[normalize-space()='Utilities']/parent::li")
        this.ACCOUNT_MANAGER_SUB_ITEM = this.findElement("//ul[@id='utilities']//a[contains(normalize-space(),'Accounts Manager')]")
    }

    // Navigation actions
    async goToAccountManager() {
        const { AccountManagerPage } = require("./utilities_tests/account_manager/accountManager.page")
        await this.hover(this.UTILITIES_MAIN_ITEM)
        await this.click(this.ACCOUNT_MANAGER_SUB_ITEM)
        return new AccountManagerPage(this.page)
    }
}

module.exports = { Navigation }