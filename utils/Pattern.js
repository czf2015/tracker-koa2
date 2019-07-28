// 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
// 通用的惰性单例：
function getSingle(fn) {
    let result;
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}

module.exports = {
    getSingle,
}


// 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
// 在函数作为一等对象的语言中，策略模式是隐形的。strategy就是值为函数的变量。
