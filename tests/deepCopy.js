function deepCopy(oldObj) {
    const list = []

    return function deepCopy(oldObj) {
        list.push(oldObj)
        
        const newObj = Array.isArray(oldObj) ? [] : {}
    
        for (const key in oldObj) {
            if (oldObj.hasOwnProperty(key)) {
                if (typeof oldObj[key] === 'object') {
                    if (list.find(item => item === oldObj[key]) && Object.keys(raw).length > 1) {
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
    }(oldObj)
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
