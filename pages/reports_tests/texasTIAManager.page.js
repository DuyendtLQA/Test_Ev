const { Navigation } = require('../navigation.page')

class TexasTIAManagerPage extends Navigation {
    /**
   * @param {import('@playwright/test').Page} page
   */
     constructor(page) {
        super(page)
        // Elements go here
        this.YEAR_SELECT_BOX = this.findElement("#year")
        this.LOCATION_SELECT_BOX = this.findElement("#schools")
        this.GO_BUTTON = this.findElement("//input[@type='submit' and @value='Go']")
        this.EXPORT_PDF_BUTTON = this.findElement("button#pdf")
    }

    async goto() {
        await this.page.goto("/adminportal/texas_tia_edit")
    }

    // Page actions go here
    async selectYear(year) {
        await this.selectOptions(this.YEAR_SELECT_BOX, year)
    }

    async selectLocation(school) {
        await this.selectOptions(this.LOCATION_SELECT_BOX, school)
    }

    async clickGoButton() {
        await this.click(this.GO_BUTTON)
    }

    async filterStudent(year, school) {
        await this.selectYear(year)
        await this.selectLocation(school)
        await this.clickGoButton()
    }

    async clickExportPdfButton() {
        await this.downloadFile(this.EXPORT_PDF_BUTTON, "./download")
    }
}

module.exports = { TexasTIAManagerPage }