const { Navigation } = require('../../navigation.page')

class CreateAccountPage extends Navigation {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        super(page)
        // Elements go here
        this.YEAR_SELECT_BOX = this.findElement("#year")
        this.LAST_NAME = this.findElement("#user_lastname")
        this.FIRST_NAME = this.findElement("#user_firstname")
        this.EMAIL = this.findElement("#user_email")
        this.LEVEL = this.findElement("select#distlevel")
        this.STAFF_MEMBER_BTN = this.findElement("[type='submit']")
        this.LABEL_USER_CREATED = this.findElement("[class='alert alert--success']")
        this.ALERT_SUCCESS = "Was Created And An Email Was Sent To Him/Her"
    }

    // Page actions go here
    async fillFirstName() {
        await this.sendKeys(this.FIRST_NAME, 'test')
    }

    async fillLastName() {
        await this.sendKeys(this.LAST_NAME, Math.random().toString())
    }

    async fillEmail() {
        await this.sendKeys(this.EMAIL, 'test' + Math.random().toString() + '@gmail.com')
    }

    async selectLevelAccess(level) {
        await this.selectOptions(this.LEVEL, level)
    }

    async clickBtnStaffMember() {
        await this.click(this.STAFF_MEMBER_BTN)
    }

    async verifyUserCreated() {
        await this.shouldBeContainsText(this.LABEL_USER_CREATED, this.ALERT_SUCCESS)
    }
}

module.exports = { CreateAccountPage }