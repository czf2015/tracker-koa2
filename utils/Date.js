export class DateFormat {
  static get(val) {
    let y = val.getFullYear();
    let m = val.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = val.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d + ' ' + "00:00:00";
  }

  static dateHandle(val) {
    let y = val.getFullYear();
    let m = val.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = val.getDate();
    d = d < 10 ? ('0' + d) : d;
    return String(y) + String(m) + String(d);
  }
  static getDate(val) {
    let y = val.getFullYear();
    let m = val.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = val.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  }
  static fullDate(val) {
    let y = val.getFullYear();
    let m = val.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = val.getDate();
    d = d < 10 ? ('0' + d) : d;
    // 获取小时数(0-23)
    let hou = (val.getHours() < 10 ? ('0' + val.getHours()) : val.getHours());
    // 获取分钟数(0-59)
    let min = (val.getMinutes() < 10 ? ('0' + val.getMinutes()) : val.getMinutes());
    // 获取秒数(0-59)
    let sec = (val.getSeconds() < 10 ? ('0' + val.getSeconds()) : val.getSeconds());
    return y + '-' + m + '-' + d + ' ' + hou + ":" + min + ":" + sec;
  }
}