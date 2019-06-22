export function getRoutes() {
  return getCurrentPages().map(item => item.route)
}


export function navigateBackToTab(url = '', renew = false) {
  if (renew) {
    wx.reLaunch({
      url: url || `/${getRoutes()[0]}`,
    })
  } else {
    wx.switchTab({
      url: url || `/${getRoutes()[0]}`
    })
  }
}


export function unLoad(url = '', route = 'reLaunch') {
  if (url) {
    if (getRoutes().every(item => item !== url)) {
      wx[route]({
        url: `/${url}`,
      })
    }
  } else {
    wx[route]({
      url: `/${getRoutes()[0]}`
    })
  }
}

