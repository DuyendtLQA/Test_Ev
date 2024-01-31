// import { test, expect } from '../../../fixtures/setup.fixture'
// import { TexasTIAManagerPage } from '../../../pages/utilities_tests/texasTIAManager.page'
// // let texasTIAManagerPage = new TexasTIAManagerPage()

// test.skip("[44] Verify successful filtering of UI Texas TIA Manager", async ({ accountManagerPage, logger }) => {
//     // let accountManagerPage = await homePage.goToAccountManager()
//     await logger.step("Click link [Texas TIA Manager] ")
//     let texasTIAManagerPage = await accountManagerPage.goToTexasTIAManager()
//     await logger.expect("Label [Texas TIA Management] should be displayed")
//     await logger.step("Select the field of the box [Year]")
//     await texasTIAManagerPage.selectYear("2022")
//     await logger.step("Select the field of the box [Location]")
//     await texasTIAManagerPage.selectLocation("Indiana School")
//     await logger.step("Click button [Go]")
//     await texasTIAManagerPage.clickGoButton()
//     await logger.expect("Table [Texas TIA Management]  should be displayed")
//     await texasTIAManagerPage.sleep(10000)
// })


// test.skip("[46] Verify Successful Exporting PDF Texas TIA Manager", async ({ accountManagerPage, logger }) => {
//     // let accountManagerPage = await homePage.goToAccountManager()
//     await logger.step("Click link [Texas TIA Manager] ")
//     let texasTIAManagerPage = await accountManagerPage.goToTexasTIAManager()
//     await logger.expect("Label [Texas TIA Management] should be displayed")
//     await logger.step("Select the field of the box [Year]")
//     await texasTIAManagerPage.selectYear("2022")
//     await logger.step("Select the field of the box [Location]")
//     await texasTIAManagerPage.selectLocation("Indiana School")
//     await logger.step("Click button [Go]")
//     await texasTIAManagerPage.clickGoButton()
//     await logger.step("Click button [PDF]")
//     await texasTIAManagerPage.clickExportPdfButton()
// })