// // 将对象中的某些属性的值进行转换
function format(raw, fields, convert) {
  fields.forEach(field => {
    for (const key in raw) {
      if (typeof raw[key] === 'object') {
        if (Array.isArray(raw[key])) {
          raw[key].forEach(item => item = format(item, [field], convert))
        } else {
          if (raw[key] === raw) {
            console.log(`{ ${key}: [Circular] }`)
            // console.log(raw[key])
          } else {
            // list.push(raw)
            raw[key] = format(raw[key], [field], convert)
          }
        }
      } else {
        if (key === field) {
          raw[key] = convert(raw[key])
        }
      }
    }
  })

  return raw
}
  
  const raw = {
    a: 1,
    c: [1, 2, 3],
    b: {
        b: 1,
        c: [1, 2, 3],
        d: {
            e: 3
        }
    }
}

raw.f = raw
console.log(raw)

const fields = ['b', 'e']

function fix2(x) {
  return parseFloat(x).toFixed(2)
}

console.log(format(raw, fields, fix2))

console.log(raw.f)