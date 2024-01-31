const { Navigation } = require('./navigation.page')


class HomePage extends Navigation {
    /**
   * @param {import('@playwright/test').Page} page
   */
     constructor(page) {
        super(page)
        // Elements go here
    }

    async goto() {
        await this.page.goto("/districtadmin/welcome")
    }

    // Page actions go here
}

module.exports = { HomePage }