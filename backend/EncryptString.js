const {AES, enc} = require('crypto-js');
const { SECRET } = require("./constants");

const decrypt = (encrypted) => {
    return AES.decrypt(encrypted, SECRET).toString((enc.Utf8));
}

const encrypt = (string) => {
    return AES.encrypt(string, SECRET).toString();
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;