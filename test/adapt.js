// 将对象的属性按照映射更改
function adapt(raw, transform) {
    const list = []

    return function adapt(raw, transform) {
        list.push(raw)

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
                    if (list.find(item => item === raw[newKey])) {
                        console.log(`{ ${newKey}: [Circular] }`)
                    } else {
                        raw[newKey] = adapt(raw[newKey], transform)
                    }
                }
            })
        }

        return raw
    }(raw, transform)
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
raw.d.f = raw
console.log(raw)

const transform = {
    e: 'x',
    b: 'y',
    c: 'z'
}

console.log(adapt(raw, transform))

console.log(raw.f)