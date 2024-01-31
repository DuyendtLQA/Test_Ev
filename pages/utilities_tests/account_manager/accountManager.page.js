const { CreateAccountPage } = require('./createAccount.page')
const { Navigation } = require('../../navigation.page')

class AccountManagerPage extends Navigation {
    /**
   * @param {import('@playwright/test').Page} page
   */
     constructor(page) {
        super(page)
        // Elements go here
        this.TEXAS_TIA_MANAGER_LINK = this.findElement("//a[text()='Texas TIA Manager']")
        this.CREATE_ACCOUNT_LINK = this.findElement("//a[text()='Create New User']")
    }

    async goto() {
        await this.page.goto("/adminportal/accounts_manager")
    }

    async goToCreateAccount() {
        await this.click(this.CREATE_ACCOUNT_LINK)
        return new CreateAccountPage(this.page)
    }

    async goToManagePrimarySecondaryEvaluators() {
        await this.click(this.CREATE_ACCOUNT_LINK)
        return new CreateAccountPage(this.page)
    }
}

module.exports = { AccountManagerPage }