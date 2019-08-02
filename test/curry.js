function curry(fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    const _curry = function () {
        if (arguments.length === 0) {
            return fn.apply(null, args)
        } else {
            args = args.concat(Array.prototype.slice.call(arguments))
            return _curry
        }
    }
    return _curry
}

function sum(...args) {
    return args.reduce((a, b) => a + b)
}

console.log(curry(sum, 1, 2, 3)(4)(5)(6)())