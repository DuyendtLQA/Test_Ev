export class Logger {
    count = 0

    /**
     * Use to log a step to console
     * @param {string} text - Step description 
     */
    step(text) {
        this.count += 1
        console.log(`%c[STEP ${this.count}] ` + text, "background: #53EF05")
    }

    /**
     * Use to log an verify step to console
     * @param {string} text - Expected result
     */
    expect(text) {
        console.log(`%c[EXPECTATION ${this.count}] ` + text, "background: #1300FC")
    }
}