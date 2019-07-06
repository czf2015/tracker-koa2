const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    "id": 1,
    "text": String, // "男",
    "value": String, // "1",
    "option_id": Number, // 1,
    "option_text": String, // "男",
    "checked": Boolean, // false
})

const validationSchema = new mongoose.Schema({
    "required": Boolean, // true,
    "min": Number, // -1,
    "max": Number, // -1,
    "minLength": Number, // -1,
    "maxLength": Number, // -1,
    "minOptionsNumber": Number, // -1,
    "maxOptionsNumber": Number, // -1
})

const questionSchema = new mongoose.Schema({
    "errorStyle": String, // "hide",
    "id": Number, // 4,
    "image": String, // "http://lemonbox.oss-cn-beijing.aliyuncs.com/img/qu_base/gender.png",
    "options": [optionSchema],
    "placeholder": String, // "",
    "question_id": Number, // 3,
    "question_text": String, // "性别",
    "remakr2": String, // "",
    "remark": String, // "",
    "text": String, // "您的性别",
    "title": String, // "基本信息",
    "type": String, // "RADIO",
    "validation": validationSchema,
    "value": String, // ""
})

const requiredOptionSchema = new mongoose.Schema({
    "optionId": [
        Number, // 2
    ],
    "matchType": String, // "exclude"
})

const prerequisiteSchema = new mongoose.Schema({
    "questionId": Number, // 10,
    "range": {
        "max": Number, // -1,
        "min": Number, // -1
    },
    "requiredOptions": [requiredOptionSchema ]
})

const schema = new mongoose.Schema({
    questions: [questionSchema],
    relations: [
        {
            "questionId": Number, // 13,
            "prerequisites": [prerequisiteSchema],
            "options": [
                {
                    "optionId": Number, // 5,
                    "prerequisites": [prerequisiteSchema]
                }
            ]
        },
    ]
})

module.exports = mongoose.model('Questionnaire', schema)