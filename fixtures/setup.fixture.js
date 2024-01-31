const base = require('@playwright/test');
const fs = require('fs')
// const { LoginPage } = require('../pages/login.page');
const { Logger } = require('../utilities/Logger');
const { HomePage } = require('../pages/home.page');

exports.test = base.test.extend({
    // imageSearch: async ({ page }, use) => {
    //     const examplePage = new ExamplePage(page)
    //     await examplePage.goto()
    //     await examplePage.exampleAction()
    //     await use(examplePage)
    //   },
    authenticated: [async ({ browser }, use) => {
        // const context = await browser.newContext()
        // const page = await context.newPage()
        // const fileName = "./auth/cookies.json"
        // const loginPage = new LoginPage(page)
        // await loginPage.goto()
        // await loginPage.login("contractor_neo.do@educationadvanced.com", "Matkhau123!")
        // await loginPage.sleep(40000)
        // const homePage = new HomePage(page)
        // await page.context().storageState({path: fileName})
        // await page.close()
        // await use(fileName)
        
        // bypass login step by using cookies sid
        const filePath = "./auth/cookies.json"
        let content = JSON.parse(fs.readFileSync(filePath, "utf-8"))
        if(process.env.SID) {
            content.cookies[0].value = process.env.SID
			fs.writeFileSync(filePath, JSON.stringify(content))
        }
        await use(filePath)
      }, {scope: 'worker'}],

    homePage: async ({ browser, authenticated}, use) => {
        console.log(authenticated)
        const context = await browser.newContext({storageState: authenticated})
        const page = await context.newPage()
        const homePage = new HomePage(page)
        await homePage.goto()
        await use(homePage)
    },

    accountManagerPage: async ( { homePage }, use) => {
        const accountManagerPage = await homePage.goToAccountManager()
		    await use(accountManagerPage)
    },

    logger: async ({ }, use) => {
		await use(new Logger())
    }
})