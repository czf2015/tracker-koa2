export function deepCopy(oldObj) {
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

// 判断对象或数组为空值
export function isAvailable(x) {
  return typeof x === 'object' ?
    x ?
      (Array.isArray(x) ? x : Object.keys(x)).length > 0 :
      false :
    x
}

export function keyValues(obj) {
  return Object.keys(obj).map(key => ({
    key,
    value: obj[key]
  }))
}

export function keyValue(raw) {
  return typeof raw === 'object' ? keyValues(raw)[0] : raw
}

