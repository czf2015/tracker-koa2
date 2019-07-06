const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    "id": String,
    "title": String,
    "bannerImg": String,
    "galleryImgs": [String],
    "categoryList": [{
      "title": String,
      "children": [{
        "title": String,
        "children": [{
          "title": String,
        }]
      }, {
        "title": String,
      }]
    }, {
      "title": String,
    }, {
      "title": String,
    }, {
      "title": String,
    }]
  })


  module.exports = mongoose.model('Detail', schema)
