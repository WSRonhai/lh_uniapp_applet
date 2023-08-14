export default {
    getData(programId) {
        if (programId === 1) {
            // 跆拳道
            return [
                {
                    code: 'PTF',
                    name: '比分胜',
                },
                {
                    code: 'PUN',
                    name: '犯规胜',
                },
                {
                    code: 'WDR',
                    name: '弃权胜',
                },
                {
                    code: 'DSQ',
                    name: '失格胜',
                },
                {
                    code: 'WIW',
                    name: '体重胜',
                },
                {
                    code: 'SUP',
                    name: '优势胜',
                },
                {
                    code: 'PTG',
                    name: '分差胜',
                },
                {
                    code: 'DoubleWDR',
                    name: '双弃权',
                    type: true,
                },
                {
                    code: 'DoubleDSQ',
                    name: '双失格',
                    type: true,
                },
            ];
        } else if (programId === 2 || programId === 6) {
            // 空手道 柔道
            return [
                {
                    code: 'KACHI',
                    name: '比分胜',
                },
                {
                    code: 'HACHI_KACHI',
                    name: '优势胜',
                },
                {
                    code: 'SENSHU',
                    name: '先取胜',
                },
                {
                    code: 'HANTEI',
                    name: '判定胜',
                },
                {
                    code: 'HANSOKU',
                    name: '犯规胜',
                },
                {
                    code: 'KIKEN',
                    name: '弃权胜',
                },
                {
                    code: 'SHIKKAKU',
                    name: '失格胜',
                },
                {
                    code: 'HIKIWAKE',
                    name: '平局',
                },
                {
                    code: 'HIKIWAKE_KIKEN',
                    name: '双方弃权',
                    type: true,
                },
                {
                    code: 'HIKIWAKE_SHIKKAKU',
                    name: '双方失格',
                    type: true,
                },
            ];
        } else if (programId === 4 || programId === 5) {
            // 足球 篮球
            return [
                {
                    code: 'WIN',
                    name: '比分胜',
                },
                {
                    code: 'WAIVER',
                    name: '双弃权',
                    type: true,
                },
                {
                    code: 'DRAW',
                    name: '平局',
                    type: true,
                },
            ];
        } else if (programId === 8 || programId === 9 || programId === 11) {
            // 乒乓球 网球 羽毛球
            return [
                {
                    code: 'WIN',
                    name: '比分胜',
                },
                {
                    code: 'Level3Win',
                    name: '对方罚一局胜',
                },
                {
                    code: 'Level4Win',
                    name: '对方失格胜',
                },
                {
                    code: 'DEF',
                    name: '对方弃权',
                },
                {
                    code: 'DEF',
                    name: '对方弃权',
                },
                {
                    code: 'ALLDefault',
                    name: '双失格',
                    type: true,
                },
                {
                    code: 'ALLDEF',
                    name: '双弃权',
                    type: true,
                },
            ];
        } else if (programId === 13) {
            // 摔跤
            return [
                {
                    code: 'VT',
                    name: '双肩着地胜',
                },
                {
                    code: 'VA',
                    name: '弃权胜',
                },
                {
                    code: 'VB',
                    name: '受伤弃权胜',
                },
                {
                    code: 'VF',
                    name: '点名未到胜',
                },
                {
                    code: 'EV',
                    name: '因技术犯规取消比赛资格胜',
                },
                {
                    code: 'EX',
                    name: '因三个警告取消本场比赛资格胜',
                },
                {
                    code: 'ST',
                    name: '技术优势胜利，负方未获技术分胜',
                },
                {
                    code: 'SP',
                    name: '技术优势获胜，负方获得技术分胜',
                },
                {
                    code: 'PP',
                    name: '技术分获胜，负方获得技术分胜',
                },
                {
                    code: 'PO',
                    name: '技术分获胜，负方未获得技术分胜',
                },
                {
                    code: 'E2',
                    name: '双方运动员因犯规取消比赛资格胜',
                    type: true,
                },
            ];
        } else {
            return [
                {
                    code: 'WIN',
                    name: '比分胜',
                },
                {
                    code: 'WAIVER',
                    name: '双弃权',
                    type: true,
                },
                {
                    code: 'DRAW',
                    name: '平局',
                    type: true,
                },
            ];
        }
    },
    getColor(programId) {
        if (programId === 2 || programId === 6 || programId === 12) {
            return {
                blue: '蓝',
                blueValue: '蓝方',
                red: '红',
                redValue: '红方',
            };
        } else if (programId === 4 || programId === 5) {
            return {
                blue: '主',
                blueValue: '主场',
                red: '客',
                redValue: '客场',
            };
        } else if (programId === 13) {
            return {
                blue: '白',
                blueValue: '白方',
                red: '红',
                redValue: '红方',
            };
        } else {
            return {
                blue: '青',
                blueValue: '青方',
                red: '红',
                redValue: '红方',
            };
        }
    },
};
