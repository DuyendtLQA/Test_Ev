export class CommonFunctions {
    /**
     * 
     * @param {...number} number - one or two params for random less than or random in range
     * @returns {number}
     */
    static randomNumber(number) {
        switch (arguments.length){
            case 1:
                return Math.floor(Math.random() * number)
            case 2:
                return Math.floor(Math.random() * (arguments[1] - arguments[0])) + arguments[0]
            default:
                throw new Error('Wrong arguments')
        }
    }
}