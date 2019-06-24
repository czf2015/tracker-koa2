// 
import { compareTime } from './Compare.js'


export function parseCookie(cookie) {
  const cookies = {}
  if (cookie) {
    cookie.split(';').forEach(item => {
      const pair = item.split('=')
      cookies[pair[0].trim()] = pair[1]
    })
    cookies.name = 'connect.sid'
    cookies.value = cookies[cookies.name]
  }
  return cookies
}


export format(raw, fields, convert) {
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


export function adapt(raw, transform) {
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


export function extract(raw, separate) {
  const result = {}

  for (const key in raw) {
      if (key.includes(separate)) {
          result[key] = raw[key]
      }

      if (typeof raw[key] === 'object') {
          if (Array.isArray(raw[key])) {
              continue
          } else {
              if (raw[key] === raw) {
                  console.log(`{ ${key}: [Circluar] }`)
              } else {
                  Object.assign(result, extract(raw[key], separate))
              }
          }
      }
  }

  return result
}


export function extractTimes(obj) {
  const _obj = extract(obj, 'time')

  return Object.keys(_obj)
    .sort((a, b) => compareTime(_obj[a], _obj[b]))
    .map(key => ({
      key,
      value: DateFormat.fullDate(new Date(_obj[key])),
    }))
}

