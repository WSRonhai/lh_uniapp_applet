export default {
    getAgencyNameList() {
        return [['协会', '俱乐部', '企业', '政府机关', '事业单位', '学校']];
    },
    getNationalityList() {
        return [
            [
                '中国大陆',
                '中国台湾',
                '中国香港',
                '中国澳门',
                '美国',
                '英国',
                '日本',
                '加拿大',
                '法国',
                '韩国',
                '德国',
                '澳大利亚',
                '奥地利',
                '波兰',
                '丹麦',
                '俄罗斯',
                '荷兰',
                '其他',
            ],
        ];
    },
    getAgencyCodeByName(name) {
        switch (name) {
            case '协会':
                return 'ASSOCIATION';
            case '俱乐部':
                return 'CLUB';
            case '企业':
                return 'ENTERPRISE';
            case '政府机关':
                return 'GOVERNMENT';
            case '事业单位':
                return 'INSTITUTION';
            case '学校':
                return 'SCHOOL';
        }
    },
    getAgencyNameByCode(code) {
        switch (code) {
            case 'ASSOCIATION':
                return '协会';
            case 'CLUB':
                return '俱乐部';
            case 'ENTERPRISE':
                return '企业';
            case 'GOVERNMENT':
                return '政府机关';
            case 'INSTITUTION':
                return '事业单位';
            case 'SCHOOL':
                return '学校';
            default:
                return '请选择';
        }
    },
    getLocationParams(name) {
        //获取页面栈
        const pages = getCurrentPages();
        //获取路由参数
        const curPage = pages[pages.length - 1];
        return name ? curPage.options[name] : curPage.options;
    },
    verPhone(poneInput) {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (myreg.test(poneInput)) {
            return false;
        } else {
            return true;
        }
    },
    getAge(strBirthday) {
        var returnAge,
            strBirthdayArr = strBirthday.split('-'),
            birthYear = strBirthdayArr[0],
            birthMonth = strBirthdayArr[1],
            birthDay = strBirthdayArr[2],
            d = new Date(),
            nowYear = d.getFullYear(),
            nowMonth = d.getMonth() + 1,
            nowDay = d.getDate();
        if (nowYear == birthYear) {
            returnAge = 0; //同年 则为0周岁
        } else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay; //日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth; //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge; //返回周岁年龄
    },
    matchStatus(status) {
        switch (status) {
            case 1:
                return {
                    color: 'b-yellow',
                    name: '计划中',
                };
            case 2:
                return {
                    color: 'b-red',
                    name: '点击报名',
                    value: '报名中',
                };
            case 3:
                return {
                    color: 'b-green',
                    name: '进行中',
                };
            case 4:
                return {
                    color: 'b-gray',
                    name: '已结束',
                };
            case 5:
                return {
                    color: 'b-red',
                    name: '报项中',
                };
        }
    },
    initLocationList (programId) {
        switch (programId) {
            case 4:
                return [{name: '中锋', value: '中锋'}, 
                {name: '左中峰', value: '左中峰'}, 
                {name: '左边锋', value: '左边锋'}, 
                {name: '右中锋', value: '右中锋'}, 
                {name: '右边锋', value: '右边锋'}, 
                {name: '中前锋', value: '中前锋'}, 
                {name: '左前锋', value: '左前锋'}, 
                {name: '右前锋', value: '右前锋'},
                {name: '前腰', value: '前腰'}, 
                {name: '左前腰', value: '左前腰'}, 
                {name: '右前腰', value: '右前腰'}, 
                {name: '中中场', value: '中中场'}, 
                {name: '左中中场', value: '左中中场'}, 
                {name: '左中场', value: '左中场'}, 
                {name: '左边中场', value: '左边中场'}, 
                {name: '右中中场', value: '右中中场'}, 
                {name: '右中场', value: '右中场'},
                {name: '右边中场', value: '右边中场'}, 
                {name: '后腰', value: '后腰'}, 
                {name: '左后腰', value: '左后腰'}, 
                {name: '右后腰', value: '右后腰'}, 
                {name: '中后卫', value: '中后卫'}, 
                {name: '左中后卫', value: '左中后卫'}, 
                {name: '左后卫', value: '左后卫'}, 
                {name: '左边后卫', value: '左边后卫'}, 
                {name: '右中后卫', value: '右中后卫'},
                {name: '右后卫', value: '右后卫'}, 
                {name: '右边后卫', value: '右边后卫'}, 
                {name: '清道夫', value: '清道夫'}, 
                {name: '守门员', value: '守门员'}]
            case 5:
                return [{name: '控球后卫', value: '控球后卫'}, 
                {name: '得分后卫', value: '得分后卫'}, 
                {name: '小前锋', value: '小前锋'}, 
                {name: '大前锋', value: '大前锋'}, 
                {name: '中锋', value: '中锋'}]
            default:
                return [{name: '待定', value: '待定'}]
        }
    }
};
