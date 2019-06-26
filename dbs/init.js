const db = require('mongoose')
const config = require('../config.js')

db.connect(config.db, {
    useNewUrlParser: true
})

module.exports = db
