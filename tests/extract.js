// 从对象中抽取属性包含某个字符串的属性
function extract(raw, separate) {
    const list = []

    return function extract(raw, separate) {
        list.push(raw)

        const result = {}

        for (const key in raw) {
            if (key.includes(separate)) {
                result[key] = raw[key]
            }

            if (typeof raw[key] === 'object') {
                if (Array.isArray(raw[key])) {
                    continue
                } else {
                    if (list.find(item => item === raw[key]) && Object.keys(raw).length > 1) {
                        console.log(`{ ${key}: [Circluar] }`)
                    } else {
                        Object.assign(result, extract(raw[key], separate))
                    }
                } 
            }
        }

        return result
    }(raw, separate)
}


const raw = {
    morning_time: 1,
    afternoon_time: [{ sleep_time: 1 }],
    night_time: {
        sleep_time: 8
    }
}

raw.t = raw
console.log(raw)

const separate = 'time'

console.log(extract(raw, separate))
