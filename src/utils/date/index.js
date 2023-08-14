/**
 *
 * @param {laterTime}  过去的时间
 * @returns 计算过去到现在的年份方便select选择
 */
export function getlaterYear(laterTime = '2019') {
    let yearList = [];
    let laterDate = new Date(laterTime);
    let lateYear = laterDate.getFullYear();
    let date = new Date();
    let y = date.getFullYear();
    for (let i = lateYear; i <= y; i++) {
        let obj = {
            label: '',
            id: -1,
            name: '',
        };
        obj.label = i;
        obj.id = i;
        obj.name = i;
        yearList.push(obj);
    }
    yearList.reverse();
    console.log('yearList', yearList);
    return yearList;
}

export function getCurrenMothFisrtEndDay(datetime) {
    const date = datetime ? new Date(datetime) : new Date();
    let obj = {
        firstDay: '',
        lastDay: '',
    };
    let arr = [];
    date.setDate(1); // 将当前时间的日期设置成第一天
    let year = date.getFullYear(); // 得到当前年份
    let month = date.getMonth() + 1; // 得到当前月份（0-11月份，+1是当前月份）
    month = month > 10 ? month : '0' + month; // 补零
    arr.push(year);
    arr.push(month); // 得到当前月份
    let day = date.getDate(); // 得到当前天数，实际是本月第一天，因为前面setDate(1) 设置过了
    arr.push(day);
    obj.firstDay = arr.join('/');
    //第一种计算最后天
    // let nextMonthFirthDay = new Date(year, month, 1) // 下个月的第一天
    // let oneDay = 1000 * 60 * 60 * 24 // 一天的时间毫秒数
    // let endDay = new Date(nextMonthFirthDay - oneDay)
    // let lastDay = endDay.getDate() // 本月最后一天
    //第二种计算最后天
    let nextMonthFirthDay = new Date(year, month, 0); // 下个月的第一天
    let lastDay = nextMonthFirthDay.getDate(); // 本月最后一天
    arr.pop();
    arr.push(lastDay);
    obj.lastDay = arr.join('/');
    return obj;
}
/**
 * @param
 * 转换时间戳为年月
 */
export function getCurrentYearMonth(time = null) {
    let date = time ? new Date(time) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let arr = [year, month < 10 ? '0' + month : month];
    return arr.join('-');
}

/**
 * @param
 * 转换时间戳为年日;
 */
export function getCurrentYearMonthDay(time = null) {
    let date = time ? new Date(time) : new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let arr = [year, month < 10 ? '0' + month : month, date.getDate() < 10 ? '0' + date.getDate() : date.getDate()];
    return arr.join('-');
}

/**
 * @param
 * 计算票的使用时效
 */
export function geTageingDay(lastDay = 0) {
    let arr = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + lastDay);
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    arr.push(year, month, day);
    return arr.join('-');
}

export const monthArr = [
    {
        id: 1,
        name: '一月',
    },
    {
        id: 2,
        name: '二月',
    },
    {
        id: 3,
        name: '三月',
    },
    {
        id: 4,
        name: '四月',
    },
    {
        id: 5,
        name: '五月',
    },
    {
        id: 6,
        name: '六月',
    },
    {
        id: 7,
        name: '七月',
    },
    {
        id: 8,
        name: '八月',
    },
    {
        id: 9,
        name: '九月',
    },
    {
        id: 10,
        name: '十月',
    },
    {
        id: 11,
        name: '十一月',
    },
    {
        id: 12,
        name: '十二月',
    },
];

/**
 * 格式化时间用于显示对战分析
 * @param {*} value
 * @param {*} isTime 是否需要时分秒
 * @returns
 */

export function formatDate(value, isTime) {
    var date;
    if (value instanceof Date) {
        date = value;
    } else if (value instanceof Object) {
        date = value._d;
    } else {
        var arr = value.split(/[- : /]/);
        if (value.indexOf(':') > -1) {
            date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        } else {
            date = new Date(arr[0], arr[1] - 1, arr[2]);
        }
    }
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    if (!isTime) {
        return Y + M + D;
    }
    var h = ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
