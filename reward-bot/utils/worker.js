const { store, wipeData } = require('./store') 
const dataJSON = require('./../data.json')
const { getAsset } = require('./query')

class Bot {
    constructor () {
        this.active = true
    }
    async work() {
        const currentDate = new Date(dataJSON.recent_save)
        if(this.checkNewMonth(currentDate)) {
            wipeData()
        }
        if(this.checkNewDay(currentDate)) {
            console.log("running...")
            let result = await getAsset() 
            store(result)
        }
    }

    checkNewDay(dateLast) {
        const current = new Date()
        if (current.getMinutes() == dateLast.getMinutes()) {
            //it's the same day
            return false
        } else {
            //another day, so midnight has passed
            return true
        }
    }

    checkNewMonth(dateLast) {
        const current = new Date()
        if (current.getMonth() == dateLast.getMonth()) {
            //it's the same day
            return false
        } else {
            //another day, so midnight has passed
            return true
        }
    }
}

module.exports = Bot