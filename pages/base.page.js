const { CommonFunctions } = require("../utilities/CommonFunctions")
const { Locator, FrameLocator, Page, expect } = require('@playwright/test')


class BasePage {
    /**
     * Constructor to initialize an instance of the page
     * @param {Page} page 
     */
    constructor(page) {
        this.page = page
    }

    // Common actions go here
    /**
     * Return the locator(s) matched with the selector
     * @param {string} selector 
     * @returns {Locator}
     */
    findElement(selector) {
        return this.page.locator(selector)
    }

    /**
     * When working with iframes, you can create a frame locator that will enter the iframe and allow selecting elements in that iframe.
     * @param {string} selector
     * @returns {FrameLocator}
     */
    async findIFrame(selector) {
        return this.page.frameLocator(selector)
    }

    // Mouse actions
    /**
     * Click on the element
     * @param {Locator} element - Element to be clicked on
     * @param {number} [timeout] - Maximum time in milliseconds. Defaults to 10000
     */
    async click(element, timeout = 10000) {
        await element.click({ timeout: timeout })
    }

    /**
     * Double click on the element
     * @param {Locator} element - Element to be clicked on
     * @param {number} [timeout] - Maximum time in milliseconds. Defaults to 10000
     */
    async doubleClick(element, timeout = 10000) {
        await element.doubleClick({ timeout: timeout })
    }

    /**
     * Click on a random element in list
     * @param {Locator} elements - List of elements
     * @param {number} [timeout] - Maximum time in milliseconds. Defaults to 10000
     */
    async clickRandomElement(elements, timeout = 10000) {
        let listElement = await elements.all()
        let randomIndex = CommonFunctions.randomNumber(listElement.length)
        await listElement[randomIndex].click({ timeout: timeout })
    }

    /**
     * Move mouse and hover on element
     * @param {Locator} element - Element to be hovered
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     */
    async hover(element, timeout=10000) {
        await element.hover()
    }

    /**
     * Tick the checkbox option
     * @param {Locator} element - Element to be clicked on
     * @param {number} [timeout] - Maximum time in milliseconds. Defaults to 10000
     */
    async clickCheckbox(element, timeout = 10000) {
        await element.check({ timeout: timeout })
    }

    /**
     * Select one or multiple options
     * @param {Locator} element- Element(s) to be selected
     * @param {string|[]|object} option - Ex: "blue" or ["blue", "red"] or {index: 2}
     * Reference: https://playwright.dev/docs/input#select-options
     */
    async selectOptions(element, option) {
        await element.selectOption(option)
    }

    /**
     * Click on the element inside iFrame
     * @param {FrameLocator} frame - iFrame that contains the element
     * @param {string} selector - xpath/css-selector of the element to be clicked
     * @param {number} [timeout] - Maximum time in milliseconds. Defaults to 10000
     */
    async clickFrameElement(frame, selector, timeout = 10000) {
        await frame.locator(selector).click({ timeout: timeout })
    }

    // Keyboard actions
    /**
     * This method waits for actionability checks, focuses the element, fills it and triggers an input event after filling
     * @param {Locator} element - Element to be filled
     * @param {string} value - Value to fill in
     */
    async sendKeys(element, value) {
        await element.fill(value)
    }

    /**
     * Set a value to the input field
     * @param {Locator} element - Element to be set
     * @param {string} value - Value to set for the input
     */
    async setValue(element, value) {
        await element.clear()
        await element.fill(value)
    }

    /**
     * Focuses the element, and then sends a keydown, keypress/input, and keyup event for each character in the text.
     * 
     * [Tip] In most cases, you should use locator.fill() instead. You only need to press keys one by one if there is special keyboard handling on the page
     * @param {Locator} element - Element to be filled
     * @param {string} value - String of characters to sequentially press into a focused element
     * @param {number} delay - Time to wait between key presses in milliseconds. Defaults to 100
     */
    async type(element, value, delay = 100) {
        await element.pressSequentially(value, { delay: delay })
    }

    /**
     * Focuses the matching element and presses a combination of the keys
     * @param {Locator} element - Element to be focused
     * @param {string} key - Name of the key to press or a character to generate
     */
    async press(element, key) {
        await element.press(key)
    }

    // Get element attribute
    /**
     * Returns the node.textContent
     * @param {Locator} element - Element to get text
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     * @returns {Promise<null|string>}
     */
    async getText(element, timeout = 10000) {
        return await element.textContent({ timeout: timeout })
    }

    /**
     * Returns the matching element's attribute value
     * @param {Locator} element - Element to get attribute
     * @param {string} attribute - Attribute name to get the value for
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     * @returns {Promise<null|string>}
     */
    async getAttribute(element, attribute, timeout = 10000) {
        return await element.getAttribute(attribute, { timeout: timeout })
    }

    // Windows handle
    /**
     * Click the element and open in a new windows
     * @param {Locator} element - Element to be opened in a new windows
     * @returns {Promise<Page>}
     */
    async openInNewWindows(element) {
        const pagePromise = this.page.context().waitForEvent('page')
        await this.click(element)
        const newPage = await pagePromise
        await newPage.waitForLoadState()
        return newPage
    }

    // Download actions
    /**
     * Download a file and save to targeted location
     * @param {Locator} element - Download button
     * @param {string=} filePath - Path to save the file
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 40000
     */
    async downloadFile(element, filePath, timeout = 40000) {
        // Start waiting for download before clicking. Note no await.
        const downloadPromise = this.page.waitForEvent('download', { timeout: timeout })
        await this.click(element)
        const download = await downloadPromise
        // Wait for the download process to complete
        // console.log(await download.path())
        // Save downloaded file somewhere
        if (filePath) {
            await download.saveAs(filePath + "/" + download.suggestedFilename())
            // console.log(download.path())
        }
    }

    // Other actions
    /**
     * Stop the script for a specified time
     * @param {number} ms - Timeout in milliseconds
     * @returns {}
     */
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * Verify if the element is visible
     * @param {Locator} element - Element to be verified
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     * @returns {boolean} - Return true if element is visible
     */
    async isElementVisible(element, timeout = 10000) {
        let result = await element.isVisible({ timeout: timeout })
        return result
    }

    /**
     * Verify if the element is enabled
     * @param {Locator} element - Element to be verified
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     * @returns {boolean} - Return true if element is enabled
     */
    async isElementEnabled(element, timeout = 10000) {
        let result = await element.isEnabled({ timeout: timeout })
        return result
    }

    /**
     * Verify if the element is checked
     * @param {Locator} element - Element to be verified
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     * @returns {boolean} - Return true if element is checked
     */
    async isElementChecked(element, timeout = 10000) {
        let result = await element.isChecked({ timeout: timeout })
        return result
    }

    /**
     * Hover on the element
     * @param {Locator} element - Element to be hovered on
     * @param {number} timeout - Maximum time in milliseconds. Defaults to 10000
     */
    async hoverElement(element, timeout = 10000) {
        await element.hover({ timeout: timeout })
    }

    /**
     * Reload the page
     */
    async refresh() {
        await this.page.reload()
    }

    async beVisible(element) {
        await expect(element).toBeVisible()
    }

    async shouldBeContainsText(element,text) {
        await expect(element).toContainText(text)
    }

    
}

module.exports = { BasePage }