import { test, expect } from "../../../../fixtures/setup.fixture"

let levelAccess = [
    {
        "idTest": "1",
        "levelUser": "District Level"
    },
    {
        "idTest": "2",
        "levelUser": "Staff"
    },
    {
        "idTest": "3",
        "levelUser": "Evaluator"
    },
    {
        "idTest": "4",
        "levelUser": "Supervisor"
    },
    {
        "idTest": "5",
        "levelUser": "Board President"
    }
]

levelAccess.forEach(user => {
    test(`${user.idTest} Verify successful Creation new ${user.levelUser} account with all fields `, async ({ accountManagerPage, logger }) => {
        await logger.step("Click [Create new account] link")
        let CreateAccountPage = await accountManagerPage.goToCreateAccount()
        await logger.step("Fill all fields of create account form")
        await CreateAccountPage.fillFirstName()
        await CreateAccountPage.fillLastName()
        await CreateAccountPage.fillEmail()
        await logger.step(`Select [${user.level}] Access field`)
        await CreateAccountPage.selectLevelAccess(`${user.levelUser}`)
        await logger.step("Click button [Create Staff Member]")
        await CreateAccountPage.clickBtnStaffMember()
        await logger.expect("Label Created User should be displayed")
        await CreateAccountPage.verifyUserCreated()
    })
})

test.afterEach(async ({ page }) => {
    await page.context().close()
});
