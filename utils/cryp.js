const CryptoJS = require("crypto-js");

var cryptoObj = {
    /* 加密 */
    encryptFunc: (message) => {
        var key = '944802089';//前后端约定好的秘钥
        var encrypted = CryptoJS.AES.encrypt(message, key);
        return encrypted.toString();

    },
    /* 解密 */
    decryptFunc: (message) => {
        var key = '944802089';//前后端约定好的秘钥
        var encrypted = CryptoJS.AES.decrypt(message, key);
        return encrypted.toString(CryptoJS.enc.Utf8);

    },
}

module.exports = cryptoObj