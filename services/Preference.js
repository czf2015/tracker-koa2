// 
import {
    base,
    path
} from '../mock/API.js'
// 
import {
    dispatch,
    store
} from '../store/index.js'
// 
import {
    request
} from './Http.js'


export function getPreference(orders) {
    return new Promise((resolve, reject) => {
        request({
            url: `${base}/${path.preference}?${Math.random()}`,
            method: 'POST',
            data: {
                orders
            },
            errorMsg: '查询优惠信息失败'
        }).then(res => {
            const preference = res.data.result
            const {
                index,
                promotions
            } = preference
            promotions.forEach((promotion, idx) => {
                promotion.coupon.checked = idx === index
            })
            dispatch('set', { preference })
            resolve(preference)
        })
            .catch(err => {
                wxerrorlog(err, 'getpreference->获取preference信息失败')
            })
    })
}


export function getCoupons() {
    return new Promise((resolve, reject) => {
        request({
            url: `${base}/${path.coupon}?${Math.random()}`,
            errorMsg: '优惠券获取失败'
        }).then(res => {
            const coupons = res.data.result.map(coupon => {
                coupon.valid = coupon.activate && !coupon.used_by && (new Date(coupon.end_at).getTime() + 86400000) > new Date().getTime()
                return coupon
            }).filter(coupon => coupon.valid)
            resolve(coupons)
        }).catch(err => {
            wxerrorlog(err, 'getCoupons->获取coupons信息失败')
        })
    })
}