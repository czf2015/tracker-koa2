// 
import {
  interval
} from '../mocks/TIME.js'
// 
import {
  dispatch,
  store
} from '../store/index.js'
// 
import {
  wxerrorlog
} from './Error.js'
import {
  login
} from './Admin.js'
import { getStorageSync } from './Platform.js'


export function http({
  url,
  method,
  data,
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: {
        cookie: `${getStorageSync('cookies').name}=${getStorageSync('cookies').value}`
      },
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}


// 封装所有请求
export function request({
  url,
  method,
  data,
  title,
  errorMsg,
}) {
  const promiseCookies = new Promise((resolve, reject) => {
    const cookies = getStorageSync('cookies')
    if (cookies && new Date().getTime() < new Date(cookies.expires || cookies.Expires).getTime()) {
      resolve(cookies)
    } else {
      login()
        .then(parseCookies => {
          resolve(parseCookies)
        })
        .catch(err => {
          wx.showModal({
            title: '服务器开小差了~(noCookies)',
            content: '请立即联系客服处理',
            showCancel: false,
            success() {
              wx.navigateTo({
                url: '/pages/account/account',
              })
            }
          })
        })
    }
  })

  return promiseCookies.then(cookies => {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        mask: true
      })

      wx.request({
        url,
        header: {
          cookie: `${cookies.name}=${cookies.value}`
        },
        data,
        method,
        success(res) {
          wx.hideLoading()

          if (res.statusCode == 200) {
            if (res.data.status == 'success') {
              resolve(res)
            } else {
              const title = res.data.error || `${errorMsg}(002)`
              wx.showToast({
                title,
                mask: true,
                icon: 'none',
                duration: interval
              })
              reject(res)
            }
          } else {
            wx.showToast({
              title: `${errorMsg}(${res.statusCode})`,
              mask: true,
              icon: 'none',
              duration: interval
            })
            wxerrorlog(res, `url statusCode: ${url} ->(${res.statusCode})`)
          }
        },
        fail(err) {
          wx.showToast({
            title: '网络不好请重试',
            mask: true,
            icon: 'none',
            duration: interval
          })
          wxerrorlog(err, `request fail: ${url}`)
        }
      })
    })
  })
}