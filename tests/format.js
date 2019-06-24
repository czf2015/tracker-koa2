// // 将对象中的某些属性的值进行转换
function format(raw, fields, convert) {
  const list = {}
  
  return function format(raw, fields, convert) {
    fields.forEach(field => {
      if (typeof list[field] === 'undefined') {
        list[field] = [raw]
      } else {
        list[field].push(raw)
      }
      for (const key in raw) {
        if (typeof raw[key] === 'object') {
          if (Array.isArray(raw[key])) {
            raw[key].forEach(item => item = format(item, [field], convert))
          } else {
            if (list[field].find(item => item === raw[key])) {
              console.log(`{ ${key}: [Circular] }`)
            } else {
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
  }(raw, fields, convert)
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