import http from '../http';

//我的票夹 -- 赛场门票
export function myMatchTicket(pageNum, pageSize) {
    return http.post(`/matchOa/manager/website/myMatchTicket/${pageNum}/${pageSize}`, {
        custom: { auth: true },
    });
}
//我的票夹 -- 景区门票
export function myScenicTicket(pageNum, pageSize) {
    return http.post(`/matchOa/manager/website/myScenicTicket/${pageNum}/${pageSize}`, {
        custom: { auth: true },
    });
}

// 查询已支付订单
export function pagePayedOrder(pageNum, pageSize) {
    return http.get(`/pay/order/pagePayedOrder/${pageNum}/${pageSize}`, {
        custom: { auth: true },
    });
}

// 我收藏的景点
export function collectedScenic() {
    return http.get(`/matchOa/manager/website/collectedScenic`, {
        custom: { auth: true },
    });
}

/**
 * 我收藏的酒店
 */
export function collectedHotel() {
    return http.get(`/matchOa/manager/website/collectedHotel`, {
        custom: { auth: true },
    });
}

/**
 * 查询运动员编号
 */
export function playerSelect(cardId) {
    return http.get(`/match/player/findCardSinglePlayer/${cardId}`, {
        custom: { auth: true },
    });
}
