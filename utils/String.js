// console.log(str.match(/[\u0000-\u00ff]/g))     //半角   
// console.log(str.match(/[\u4e00-\u9fa5]/g))     //中文   
// console.log(str.match(/[\uff00-\uffff]/g))     //全角  

export function hasChinese(str) {
    return str.search(/[\u4e00-\u9fa5]/g) !== -1
}

export function getRealLength(str) {
    let result = 0

    if (str) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
                result++
            } else {
                result += 2
            }
        }
    }
    return result
}

export function cutStr(str, max) {
    if (getRealLength(str) > max) {
        return cutStr(str.slice(0, -1), max)w
    } else {
        return str
    }
}