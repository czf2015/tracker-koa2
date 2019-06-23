class DataBase {
    constructor(db, tbs) {
        super()
        this.name = db
        tbs.forEach(tb => this[tb] = {})
    }

    add(param, handle) {

    }

    insert(param, handle) {

    }

    findAll(param, handle) {

    }

    findOne(param, handle) {

    }

    updateAll(param, handle) {

    }

    updateOne(param, handle) {

    }

    deleteAll(param, handle) {

    }

    deleteOne(param, handle) {
        
    }
}

module.exports = DataBase