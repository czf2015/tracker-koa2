// 
import {
    base,
    path
} from '../mocks/API.js'
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
    request
} from './Http.js'
import {
    wxerrorlog
} from './Error.js'
import {
    getStorageSync
} from './Platform.js'
import {
    isAvailable
} from './Object.js'


// 获取产品信息并保存到本地
export function getProductsInfo() {
    return new Promise((resolve, reject) => {
        if (isAvailable(store.state.Products)) {
            resolve(store.state.Products)
        } else {
            wx.request({
                url: `${base}/${path.goods}`,
                success(res) {
                    const {
                        status,
                        result
                    } = res.data
                    if (status == 'success') {
                        const products = result || []
                        if (products.length > 0) {
                            const Products = {}
                            products.forEach(item => {
                                Products[item.id] = item
                            })
                            dispatch('set', { Products })
                            resolve(Products)
                        } else {
                            wx.showToast({
                                title: '获取产品信息为空',
                                icon: 'none',
                                mask: true,
                                duration: interval
                            })
                            wxerrorlog({
                                result
                            }, 'getProductsInfo->获取产品信息为空')
                            reject(res)
                        }
                    } else {
                        wxerrorlog({
                            status
                        }, 'getProductsInfo->获取产品信息失败')
                        wx.showToast({
                            title: '获取产品信息失败',
                            icon: 'none',
                            mask: true,
                            duration: interval
                        })
                        reject(res)
                    }
                },
                fail(err) {
                    wx.showToast({
                        title: '获取产品信息失败',
                        icon: 'none',
                        mask: true,
                        duration: interval
                    })
                    wxerrorlog(err, 'getProductsInfo->获取产品信息失败')
                    reject(err)
                },
            })
        }
    })
}

// 获取购物车里的商品数量
export function getCartInfo(product_list = false, suggest_order = false) {
    return new Promise((resolve, reject) => {
        const cookies = getStorageSync('cookies')

        wx.request({
            url: `${base}/${path.cart}`,
            header: {
                cookie: `${cookies.name}=${cookies.value}`
            },
            method: 'POST',
            data: {
                'queryInfo': { // 必填，key名称
                    'returnFields': { //必填，返回字段列表
                        product_list,
                        suggest_order
                    },
                }
            },
            success(res) {
                const {
                    status,
                    result
                } = res.data
                if (status === 'success') {
                    const {
                        data
                    } = result
                    if (data.length > 0) {
                        const packNum = Object.keys(data[0].shopping_cart.orders).length
                        if (packNum > 0) {
                            wx.setTabBarBadge({
                                index: 3,
                                text: `${packNum}`
                            })
                            resolve(res)
                        } else {
                            wx.removeTabBarBadge({
                                index: 3,
                            })
                            resolve(res)
                        }
                    } else {
                        wx.removeTabBarBadge({
                            index: 3,
                        })
                        resolve(res)
                    }
                } else {
                    reject(res)
                }
            }
        })
    })
}


export function createOrder(orderItemIds, addressItemId, couponId) {
    request({
        url: `${base}/v1/create_order?${new Date().getTime()}`,
        method: 'POST',
        data: {
            orderInfo: { //key名称，必填
                orderItemIds, //购物车商品ID，必填
                addressItemId, //收获地址ID，必填
                couponId,
            }
        },
        title: '订单生成中',
        errorMsg: '创建订单失败'
    }).then(res => {
        const {
            data
        } = res.data.result
        if (data.length > 0) {
            wx.redirectTo({
                url: `/pages/orderInfo/orderInfo?orderId=${data[0].id}&paying=true`,
            })
        }
    }).catch(res => {
        const {
            error
        } = res.data
        if (error.split('')[0] === '#') {
            const {
                Products
            } = store.state
            const ids = error.split('#')[1].split(',')
            wx.showToast({
                title: `非常抱歉，${ids.map(id => Products[id].cnproductName).join(',')}暂时缺货，\n请编辑购物车删除相应补剂，`,
                icon: 'none',
                duration: interval * 1.5,
                mask: true,
            })
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1,
                })
            }, interval * 1.5)
        }
        wxerrorlog(err, 'creatOrder->创建订单失败')
    })
}

// 进行支付
export function paying(orderId) {
    const {
        openid
    } = store.state

    return new Promise((resolve, reject) => {
        wx.request({
            url: `${base}/v1/wxpay?${new Date().getTime()}`,
            header: {
                cookie: `${getStorageSync('cookies').name}=${getStorageSync('cookies').value}`
            },
            method: 'POST',
            data: {
                type: 'JSAPI',
                orderId,
                openid,
            },
            success(res) {
                wx.hideLoading()
                wx.requestPayment({
                    ...res.data.result,
                    success(res2) {
                        resolve('paid')
                    },
                    fail(res2) {
                        resolve('unpay')
                    },
                })
            },
            fail(err) { }
        })
    })
}

export function getTransportFee() {
    return new Promise((resolve, reject) => {
        const {
            transportFee
        } = store.state
        if (isAvailable(transportFee)) {
            resolve(transportFee)
        } else {
            request({
                url: `${base}/v1/transport_fee_rule`,
                data: {
                    number: Math.random * 10000
                },
                errorMsg: '未查询到邮费请稍后再试'
            }).then(res => {
                const {
                    result: transportFee
                } = res.data
                dispatch('set', { transportFee })
                resolve(transportFee)
            }).catch(err => {
                wxerrorlog(err, 'getTransportFee->获取运费失败')
            })
        }
    })
}