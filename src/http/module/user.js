import http from '../http';

/**
 * 用户登录
 * @returns {Promise | Promise<unknown>}
 */
export function getUserProfile(data = {}) {
    return http.post('/auth/oauth/token', data, {
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        custom: { auth: false },
    });
}

/**
 * 获取本机手机号
 * @returns {Promise | Promise<unknown>}
 */
export function getPhoneNumber(data = {}) {
    return http.post('/auth/oauth/getPhoneNumber', data, {
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        custom: { auth: true, isReturn: true },
    });
}

/**
 * 绑定手机号
 * @returns {Promise | Promise<unknown>}
 */
export function bindUserMsg(data = {}) {
    return http.post('/auth/bind/userMsg', data, {
        custom: { auth: true, isReturn: true },
    });
}

/**
 * 绑定手机号发送验证码
 * @returns {Promise | Promise<unknown>}
 */
export function onBindSms(data = {}) {
    return http.post('/auth/sms/bind', data, {
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        custom: { auth: true, isReturn: true },
    });
}

/**
 * 用户端直接上传到七牛，获取七牛的token
 * @returns {Promise | Promise<unknown>}
 */
export function fileUpToken() {
    return http.get('/match/file/getUpToken', {
        custom: { auth: false },
    });
}
/**
 * 获取用户个人权限
 * @returns {Promise | Promise<unknown>}
 */
export function centerMain() {
    return http.get('/userCenter/userMain/centerMain', {
        custom: { auth: true },
    });
}

/**
 * 获取用户个人信息
 * @returns {Promise | Promise<unknown>}
 */
export function userinfo() {
    return http.get('/auth/self_info', {
        custom: { auth: true },
    });
}
/**
 * 获取我的机构
 * @returns {Promise | Promise<unknown>}
 */
export function agencyList() {
    return http.get('/userCenter/userAgency/agencyList', {
        custom: { auth: true },
    });
}
/**
 * 获取我的运动员
 * @returns {Promise | Promise<unknown>}
 */
export function sportsCareer() {
    return http.get('/userCenter/sportsCareer/bindList', {
        custom: { auth: true },
    });
}
/**
 * 获取我的赛事
 * @returns {Promise | Promise<unknown>}
 */
export function staffMatches(data) {
    return http.get(`/userCenter/userMatch/staffMatches/${data.pageNum}//${data.pageSize}`, {
        custom: { auth: true },
    });
}
/**
 * 绑定运动员
 * @returns {Promise | Promise<unknown>}
 */
export function bindPlayer(cardId) {
    return http.post(
        `/userCenter/sportsCareer/bindPlayer/${cardId}`,
        {},
        {
            custom: { auth: true },
        }
    );
}
/**
 * 解绑运动员
 * @returns {Promise | Promise<unknown>}
 */
export function removePlayer(playerId) {
    return http.delete(
        `/userCenter/sportsCareer/removePlayer/${playerId}`,
        {},
        {
            custom: { auth: true },
        }
    );
}
/**
 * 获取运动员所有参加项目
 * @returns {Promise | Promise<unknown>}
 */
export function playerPrograms(cardId) {
    return http.get(`/userCenter/playerHome/playerPrograms/${cardId}`, {
        custom: { auth: true },
    });
}
/**
 * 获取即将对战数据
 * @returns {Promise | Promise<unknown>}
 */
export function playerWaitingBattle(data) {
    return http.get(`/userCenter/playerHome/playerWaitingBattle/${data.cardId}/${data.programId}`, {
        custom: { auth: true },
    });
}
/**
 * 获取运动员历史数据列表
 * @returns {Promise | Promise<unknown>}
 */
export function playerJoinedMatch(data) {
    return http.get(`/userCenter/playerHome/playerJoinedMatch/${data.cardId}/${data.programId}`, {
        custom: { auth: true },
    });
}
/**
 * 获取历史数据详情
 * @returns {Promise | Promise<unknown>}
 */
export function playerOverBattle(data) {
    return http.get(`/userCenter/playerHome/playerOverBattle/${data.matchId}/${data.cardId}`, {
        custom: { auth: true },
    });
}
/**
 * 获取机构详情
 * @returns {Promise | Promise<unknown>}
 */
export function agencyMatchList(data) {
    return http.get(`/userCenter/userAgency/agencyMatchList/${data.agencyId}/${data.pageNum}/${data.pageSize}/${data.programId}`, {
        custom: { auth: true },
    });
}
/**
 * 获取机构项目
 * @returns {Promise | Promise<unknown>}
 */
export function queryMatchProgramByAgency(agencyId) {
    return http.get(`/userCenter/userAgency/queryMatchProgramByAgency/${agencyId}`, {
        custom: { auth: true },
    });
}
/**
 * 获取机构的运动员
 * @returns {Promise | Promise<unknown>}
 */
export function agencyPlayerList(data) {
    return http.get(`/match/player/list/${data.agencyId}/${data.pageNum}/${data.pageSize}`, {
        custom: { auth: true },
    });
}
/**
 * 获取机构运动员详情
 * @returns {Promise | Promise<unknown>}
 */
export function findSinglePlayer(agencyId, playerId) {
    return http.get(`/match/player/findSinglePlayer/${agencyId}/${playerId}`, {
        custom: { auth: true },
    });
}
/**
 * 删除运动员
 * @returns {Promise | Promise<unknown>}
 */
export function playerDelete(playerId) {
    return http.delete(`/match/player/delete/${playerId}`, {
        custom: { auth: true },
    });
}
/**
 * 删除队伍成员
 * @returns {Promise | Promise<unknown>}
 */
export function staffDelete(agencyId, playerId) {
    return http.get(`/agency/agencyStaff/delStaff/${agencyId}/${playerId}`, {
        custom: { auth: true },
    });
}
/**
 * 删除运动员
 * @returns {Promise | Promise<unknown>}
 */
export function agencyStaff(data) {
    let url = '';
    if (data.param) {
        url = `/agency/agencyStaff/coachList/${data.agencyId}/${data.pageNum}/${data.pageSize}/${data.param}`;
    } else {
        url = `/agency/agencyStaff/coachList/${data.agencyId}/${data.pageNum}/${data.pageSize}`;
    }
    return http.get(url, {
        custom: { auth: true },
    });
}

/**
 *赛事执行列表/
 * @returns {Promise | Promise<unknown>}
 */
export function miniEmpower() {
    return http.get(`/match/match/miniEmpowerV3`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行资格审查列表
 * @returns {Promise | Promise<unknown>}
 */
export function joinCheckList(data) {
    let url = `${data.matchId}/${data.status}/${data.agencyId}/${data.keyword}/${data.pageNum}/${data.pageSize}`;
    return http.get(`/match/joinCheck/list/${url}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行资格项目和汇总数
 * @returns {Promise | Promise<unknown>}
 */
export function joinCheckData(matchId, agencyId) {
    return http.get(`/match/joinCheck/checkData/${matchId}/${agencyId}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行核审
 * @returns {Promise | Promise<unknown>}
 */
export function joinCheckUpdate(data) {
    return http.get(`/match/joinCheck/update/${data.agencyId}/${data.matchId}/${data.cardId}/${data.status}`, {
        custom: { auth: true },
    });
}

/**
 *赛事执行称重项目和汇总数
 * @returns {Promise | Promise<unknown>}
 */
export function joinWeightData(matchId, agencyId) {
    return http.get(`/match/joinWeight/weightData//${matchId}/${agencyId}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行资选手稳重列表
 * @returns {Promise | Promise<unknown>}
 */
export function joinWeightList(data) {
    let url = `${data.matchId}/${data.status}/${data.agencyId}/${data.keyword}/${data.pageNum}/${data.pageSize}`;
    return http.get(`/match/joinWeight/list/${url}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行录入体重
 * @returns {Promise | Promise<unknown>}
 */
export function enterWeight(data) {
    let url = `${data.matchId}/${data.cardId}/${data.combatDetailId}/${data.joinNum}/${data.weight}`;
    return http.get(`/match/joinWeight/enterWeight/${url}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行体重审核
 * @returns {Promise | Promise<unknown>}
 */
export function joinWeightUpdate(data) {
    let url = `${data.matchId}/${data.cardId}/${data.combatDetailId}/${data.status}`;
    return http.get(`/match/joinWeight/update/${url}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行调整体重级别
 * @returns {Promise | Promise<unknown>}
 */
export function joinWeights(matchId, combatDetailId) {
    return http.get(`/match/joinWeight/weights/${matchId}/${combatDetailId}`, {
        custom: { auth: true },
    });
}
/**
 *赛事执行调整级别
 * @returns {Promise | Promise<unknown>}
 */
export function joinWeightUpdWeight(data) {
    return http.put(
        `/match/joinWeight/updWeight/${data.matchId}/${data.cardId}/${data.oldCombatDetailId}/${data.newCombatDetailId}/${data.agencyId}`,
        {
            custom: { auth: true },
        }
    );
}
/**
 *机构的对战列表
 * @returns {Promise | Promise<unknown>}
 */
export function listByJoinAgency(data) {
    let url = `/userCenter/userMatch/listByJoinAgency/${data.matchId}/${data.addressName}/${data.matchTime}/${data.isEnd}/${data.pageNum}/${data.pageSize}/${data.agencyId}`;
    return http.get(url, {
        custom: { auth: true },
    });
}
