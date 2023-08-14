export function validatePhoneNumber(phoneNumber) {
    // 使用正则表达式匹配电话号码的模式
    var pattern = /^1[3-9]\d{9}$/;

    // 使用正则表达式的 test() 方法验证电话号码是否匹配模式
    return pattern.test(phoneNumber);
}
