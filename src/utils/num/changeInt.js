export function transformNumber(num) {
    const numStr = num.toString(); // 将数字转换为字符串
    const length = numStr.length;

    if (length >= 3) {
        const transformedStr = numStr.substring(0, length - 2) + '00';
        return parseInt(transformedStr);
    } else {
        const transformedStr = numStr.substring(0, length - 1) + '0';
        return parseInt(transformedStr);
        return transformedStr;
    }
}
