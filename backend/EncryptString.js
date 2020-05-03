const {AES, enc} = require('crypto-js');


const SECRET = "KrI|rSl{npXvV!TT'I9Gh:]OSc!rd%>q5Ue%yZ|3tdWSq$GfEq"

const decrypt = (encrypted) => {
    return AES.decrypt(encrypted, SECRET).toString((enc.Utf8));
}

const encrypt = (string) => {
    return AES.encrypt(string, SECRET).toString();
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;