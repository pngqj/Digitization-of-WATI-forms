import { AES, enc} from 'crypto-js';

const SECRET = "AH}q:{LKH$i%>$@2B:>Idkf<l(OOhpZ>G{JLti$Pn*7C2G1U>G"

export const decrypt = (encrypted) => {
    return AES.decrypt(encrypted, SECRET).toString((enc.Utf8));
}

export const encrypt = (string) => {
    return AES.encrypt(string, SECRET).toString();
}