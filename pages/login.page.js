const { BasePage } = require('./base.page')

class LoginPage extends BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
     constructor(page) {
        super(page)
        // Elements go here
        this.USERNAME_FIELD = this.findElement("//input[@name='username']")
        this.NEXT_BUTTON = this.findElement("//input[@type='submit']")
        this.PASSWORD_FIELD = this.findElement("//input[@name='passwd']")
        this.LOGIN_BUTTON = this.findElement("//input[@value='Sign in']")
    }

    async goto() {
        await this.page.goto("https://login.educationadvanced.com/")
    }

    // Page actions go here
    async login(username, password) {
        await this.sendKeys(this.USERNAME_FIELD, username)
        await this.click(this.NEXT_BUTTON)
        await this.sendKeys(this.PASSWORD_FIELD, password)
        await this.click(this.LOGIN_BUTTON)
    }
}

module.exports = { LoginPage }