export function deepCopy(obj) {
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopy(obj[key]); // 递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result;
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

