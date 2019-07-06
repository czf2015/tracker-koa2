const mongoose = require('mongoose')


const userInfoSchema = new mongoose.Schema({
    "gender": String, // "男",
    "name": String, // "czf",
    "age": Number, // 32
})

const suggestionSchema = new mongoose.Schema({
    "category": String, // "饮食",
    "index": Number, // 2,
    "Suggestion": String, // "在经常喝茶或咖啡的情况下，请注意避免在下午或晚上饮用，以免影响睡眠。",
    "link": String, // ""
})

const nutritionSchema = new mongoose.Schema({
    "index": Number, // 2,
    "Weight": Number, // 10,
    "Percent": Number, // 0.8461538461538461,
    "NutriName": String, // "Ca",
    "Dose": {
        "unit": String, // "day",
        "dose": String, // "2"
    },
    "type": String, // "nutrition",
    "ProductID": String, // "8.0"
})

const productSchema = new mongoose.Schema({
    "_id": String, // "5bf78d0838c418fee23a4b45",
    "alergicWarning": String, // "",
    "cnproductName": String, // "维生素 C",
    "description": String, // "抗氧化剂； 提高免疫力，降低感冒和感染的风险； 参与胶原蛋白合成、帮助皮肤抗衰老； 抗疲劳； 促进铁的吸收。 ",
    "elementNum": String, // "E003",
    "functionIco": [
        "http://image.lemonbox.net/img/elements/icon/Immunity.png"
    ],
    "id": Number, // 3,
    "image": String, // "http://image.lemonbox.net/img/elements/element_3.png",
    "ingredients": String, // "维生素C（Vitamin C）、玫瑰果（Rose Hips）。",
    "mainElementId": Number, // 3,
    "otherElementIds": [String],
    "otherIngredients": String, // "明胶（Gelatin）、硬脂酸镁（Magnesium Stearate）、米粉（Rice Flour）。",
    "productName": String, // "Vitamin C",
    "productNameForAlgo": String, // "Vit C",
    "productNum": String, // "P0031",
    "provider": String, // "Swanson Health Products.",
    "providerAdress": String, // "Fargo, ND 58104 USA",
    "ranks": [
        {
            "provider": String, // "Labdoor",
            "rank": String, // "2/29"
        }
    ],
    "recommendReason": String, // "易吞服，剂量适中适合每天服用"
})

const schema = new mongoose.Schema({
    "id": String, // 63,
    "openid": String, // "okhMG0cb-prOSD2NTnAYBmHb4aw4",
    "userInfo": userInfoSchema,
    "targets": String, // "提高免疫力; 保护心脏健康; 提高脑力; 改善易疲劳、乏力或睡眠质量",
    "targetsIcons": [String],
    "OutSuggestion": [suggestionSchema],
    "outSuggestionSummary": String, // "首先，你的身体质量指数BMI=24.5 kg/m2，属于超重，增加了患脂肪肝、糖尿病及其他慢性病的风险。均衡饮食＋合理运动是控制体重的唯一健康有效的方式。",
    "AllQuantNutrition": [nutritionSchema],
    "QuantNutrition": [
        {
            ...nutritionSchema,
            "selected": Boolean, // true,
            "product": productSchema
        }
    ],
    "OptionalList": [
        {
            ...nutritionSchema,
            "product": productSchema
        }
    ],
    "姓名": String, // "czf",
    "性别": String, // "男",
    "随机码": String, // "gOdAG",
    "rankMap": {
        "1": {
            type: Number,
            default: 0.15,
        },
        "2": {
            type: Number,
            default: 0.3,
        },
        "3": {
            type: Number,
            default: 0.45,
        },
        "4": {
            type: Number,
            default: 0.55,
        },
        "5": {
            type: Number,
            default: 0.65,
        },
        "6": {
            type: Number,
            default: 0.75,
        },
        "7": {
            type: Number,
            default: 0.9
        },
    },
    "submitDate": String, // "2019-01-28",
    "timeStamp": Date, // 1548661275941,
    "totalPillCount": Number, // 5,
    "purchaseLink": String, // "pages/goods/detail/index?alias=36483ijyu5m71"
})


module.exports = mongoose.model('Report', schema)
