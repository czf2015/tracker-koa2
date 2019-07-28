// 绑定
export function bind(fn, context) {
    return function (...args) {
        fn.apply(context, args)
    }
}

// 柯里化
export function curry(fn) {
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        const innerArgs = Array.prototype.slice.call(arguments)
        const finalArgs = args.concat(innerArgs)
        return fn.apply(null, finalArgs)
    }
}

// 去柯里化
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}

// 管道
export function pipe(...fns) {
    return function (x) {
        fns.reduce((v, fn) => fn(v), x)
    }
}

// 分割：一旦某个函数需要花50ms以上的时间完成，那么最好可靠能否将任务分割为一系列可以使用定时器的小任务
export function chunk(array, process, context) {
    setTimeout(() => {
        const item = array.shift()
        process.call(context, item)
        if (array.length > 0) {
            setTimeout(arguments.callee, 100)
        }
    })
}

// 节流
export function throttle(method, context) {
    clearTimeout(method.tId)
    method.tId = setTimeout(() => {
        method.call(context)
    }, 100)
}

