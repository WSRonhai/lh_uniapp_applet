function rad(d) {
    return (d * Math.PI) / 180.0;
}

/**
 * 根据经纬度计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
 * @param {*} lat1
 * @param {*} lng1
 * @param {*} lat2
 * @param {*} lng2
 * @returns
 */
export default function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lng1) - rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里

    var distance = s;
    var distance_str = '';

    if (parseInt(distance) >= 1) {
        distance_str = distance.toFixed(1) + 'km';
    } else {
        distance_str = distance * 1000 + 'm';
    }

    // console.info('lyj 距离是', s);
    // console.info('lyj 距离是', distance_str);
    return distance_str;
}
// lat1 = '29.494442';
// lng1 = '106.527020';
// lat2 = '29.525928';
// lng2 = '106.504576';
// getDistance(lat1, lng1, lat2, lng2);lyj 距离是 4.1247 lyj 距离是 4.1km
