class GetStatus {
    getName(status) {
        switch (status) {
            case 1:
                return '计划中';
            case 2:
                return '报名中';
            case 3:
                return '进行中';
            case 4:
                return '已结束';
            default:
                return '--';
        }
    }
    getBgClass(status) {
        switch (status) {
            case 1:
                return 'b-yellow';
            case 2:
                return 'b-red';
            case 3:
                return 'b-green';
            case 4:
                return 'b-gray';
            default:
                return 'b-gray';
        }
    }
}
const getStatus = new GetStatus();
export default getStatus;
