function deepCopy(oldObj) {
    const newObj = Array.isArray(oldObj) ? [] : {}

    for (const key in oldObj) {
        if (oldObj.hasOwnProperty(key)) {
            if (typeof oldObj[key] === 'object') {
                if (oldObj[key] === oldObj) {
                    console.log(`{ ${key}: [Circular] }`)
                    newObj[key] = oldObj[key]
                } else {
                    newObj[key] = deepCopy(oldObj[key])
                }
            } else {
                newObj[key] = oldObj[key]
            }
        }
    }

    return newObj
}


const raw = {
    a: {},
    b: 1,
    c: [1, 2, 3],
    d: {
        b: 1,
        c: [1, 2, 3],
        d: {
            e: 3
        }
    }
}

raw.f = raw
console.log(raw)

console.log(deepCopy(raw))
