// 
import {
  interval
} from '../mocks/TIME.js'
import {
  base,
  path,
} from '../mocks/API.js'
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
  parseCookie
} from './Parse.js'
import {
  setStorageSync
} from './Platform.js'
// 
const url = `${base}/${path.admin}`


export function login() {
  return new Promise((resolve, reject) => {
    // 登录
    wx.login({
      success(res) {
        const {
          code
        } = res
        if (code) {
          dispatch('set', { code })
          // 发送 code 到后台换取 openid, sessionKey, unionId
          wx.request({
            url,
            data: {
              agent: 'weapp',
              code,
            },
            success(res2) {
              const {
                statusCode,
                header,
                data
              } = res2
              if (statusCode == 200) {
                // 本地存储cookies
                const cookies = header['set-cookie'] || header['Set-Cookie']
                if (cookies) {
                  const parse_cookies = parseCookie(cookies)
                  resolve(parse_cookies)
                  setStorageSync('cookies', parse_cookies)
                  // 获取openid, unionId, giftReferCode
                  const {
                    status,
                    result
                  } = data
                  if (status == 'success') {
                    const {
                      openid,
                      unionId,
                      userId,
                      giftReferCode
                    } = result
                    // giftReferCode
                    if (giftReferCode) {
                      dispatch('set', { giftReferCode })
                    }
                    dispatch('set', { userId })
                    // openid——程序必须有
                    if (openid) {
                      dispatch('set', { openid })
                    } else {
                      wxerrorlog({
                        result
                      }, 'login->无openid')
                      wx.showToast({
                        title: '系统开小差啦,试试重启小程序，或联系客服（无openid）',
                        icon: 'none',
                        mask: true,
                        duration: interval,
                      })
                    }
                    // unionId——新用户没有
                    if (unionId) {
                      dispatch('set', { unionId })
                    }
                  } else {
                    wxerrorlog({
                      header
                    }, 'login->cookie获取失败')
                    wx.showToast({
                      title: '系统开小差啦,试试重启小程序，或联系客服（cookie获取失败）',
                      icon: 'none',
                      mask: true,
                      duration: interval,
                    })
                  }
                }
              } else {
                wxerrorlog({
                  statusCode
                }, 'login->statusCode错误')
                wx.showToast({
                  title: '系统开小差啦,试试重启小程序（LOGIN' + statusCode + '）',
                  icon: 'none',
                  mask: true,
                  duration: interval
                })
              }
            },
            fail(err2) {
              wxerrorlog(err2, 'login->LOGIN_FAIL')
              wx.showToast({
                title: '系统开小差啦,试试重启小程序（LOGIN_FAIL）',
                icon: 'none',
                mask: true,
                duration: interval
              })
            }
          })
        } else {
          wxerrorlog(res, 'login->未获取到code')
          wx.showToast({
            title: '系统开小差啦,试试重启小程序（nocode）',
            icon: 'none',
            mask: true,
            duration: interval
          })
        }
      },
      fail(err) {
        wxerrorlog(err, 'login->LOGIN_FAIL')
        wx.showToast({
          title: '系统开小差啦,试试重启小程序（CODE_FAIL）',
          icon: 'none',
          mask: true,
          duration: interval
        })
      }
    })
  })
}


export function getWxUserInfo() {
  return new Promise((resolve, reject) => {
    const {
      hasWxUserInfo,
      wxUserInfo
    } = store.state

    if (hasWxUserInfo) {
      resolve(wxUserInfo)
    } else {
      // 获取用户信息  
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
            wx.getUserInfo({
              success(res2) {
                const {
                  userInfo
                } = res2
                dispatch('set', { wxUserInfo: userInfo })
                dispatch('set', { hasWxUserInfo: true })
                resolve(userInfo)
              },
              fail(err2) {
                wx.showToast({
                  title: 'wx.getUserInfo fail',
                  mask: true,
                  icon: 'none',
                  duration: interval
                })
                wxerrorlog(err2, 'getWxUserInfo->获取用户信息失败')
                reject(err2)
              }
            })
          }
        },
        fail(err) {
          wx.showToast({
            title: 'wx.getSetting fail',
            mask: true,
            icon: 'none',
            duration: interval
          })
          wxerrorlog(err, 'getWxUserInfo->获取用户信息失败')
          reject(err)
        }
      })
    }
  })
}


export function authorize(e, page) {
  return new Promise((resolve, reject) => {
    const {
      openid
    } = store.state
    const {
      userInfo,
      encryptedData,
      iv,
    } = e.detail
    const {
      nickName,
      avatarUrl
    } = userInfo
    wx.request({
      url,
      method: 'POST',
      data: {
        nickName,
        avatarUrl,
        encryptedData,
        iv,
        openid,
      },
      success(res) {
        dispatch('set', { wxUserInfo: userInfo })
        dispatch('set', { hasWxUserInfo: true })
        wx.showToast({
          title: '授权成功',
          mask: true,
          icon: 'none'
        })
        resolve(res)
      },
      fail(err) {
        wx.showToast({
          title: '授权失败',
          mask: true,
          icon: 'none'
        })
        wxerrorlog(err, `authorize->授权请求失败${page}`)
        reject(err)
      }
    })
  })
}


