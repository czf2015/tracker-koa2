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


export function format(raw, fields, convert) {
  fields.forEach(field => {
    for (const key in raw) {
      if (typeof raw[key] === 'object') {
        raw[key] = format(raw[key], [field], convert)
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
  const result = Array.isArray(raw) ? [] : {}

  Object.keys(raw).forEach(oldKey => {
    const newKey = Array.isArray(raw) ?
      oldKey : transform[oldKey] || oldKey
    result[newKey] = raw[oldKey]
    if (raw[oldKey] && typeof raw[oldKey] === 'object' && !Array.isArray(raw[oldKey])) {
      result[newKey] = adapt(raw[oldKey], transform)
    }
  })

  return result;
}


export function extract(raw, separate) {
  const result = {}

  for (const key in raw) {
    if (typeof raw[key] === 'object' && !Array.isArray(raw[key])) {
      Object.assign(result, extract(raw[key], separate))
    } else {
      if (key.includes(separate)) {
        result[key] = raw[key]
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

