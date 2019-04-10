let brower = {

};

let validate = {

    // 是否手机号码
    isMobile(mobile) {
        let reg = /^1[345789]\d{9}$/;
        return reg.test(mobile);
    },

    // 验证密码：长度6位-16位，必须包含数字、字母
    isPassword(password){
        if(! /^.{6,16}$/.test(password)){
            return false;
        }
        if(! /\d/.test(password)){
            return false;
        }
        return /[a-zA-Z]/.test(password);
    },

    // 验证数字(小数点后最多两位小数)
    // 用于：利润分成比、折扣
    isNumberLessOne(str){
        return /^(1(\.0{1,2})?|(0\.\d{1,2}))?$/.test(str);
    },

    // 验证数字(小数点后最多两位小数)
    // 用于：价格
    isThreeDecimal(str){
        return /^(([1-9]\d*)|0)(\.\d{1,3})?$/.test(str);
    },

    isTwoDecimal(str){
        return /^(([1-9]\d*)|0)(\.\d{1,2})?$/.test(str);
    },

    // 验证是否数字，且在两个数字之间
    isIntegerBetween(number, min, max){
        return /^\d+$/.test(number) && number>=min && number<=max;
    },
};

export { brower, validate }
