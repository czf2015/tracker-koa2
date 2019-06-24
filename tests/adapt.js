// 将对象的属性按照映射更改
function adapt(raw, transform) {
    if (Array.isArray(raw)) {
        raw.forEach(item => item = adapt(item, transform))
    } else {
        Object.keys(raw).forEach(oldKey => {
            const newKey = transform[oldKey] || oldKey

            if (newKey !== oldKey) {
                raw[newKey] = raw[oldKey]
                delete raw[oldKey]
            }

            if (typeof raw[newKey] === 'object') {
                if (raw[newKey] === raw) {
                    console.log(`{ ${newKey}: [Circular] }`)
                } else {
                    raw[newKey] = adapt(raw[newKey], transform)
                }
            }
        })
    }

    return raw
}

const raw = {
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

const transform = {
    e: 'x',
    b: 'y',
    c: 'z'
}

console.log(adapt(raw, transform))

console.log(raw.f)