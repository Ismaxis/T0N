import tonMnemonic from "tonweb-mnemonic";

const mnemonic = ["excuse", "wait", "lesson", "scrub", "friend", "detail", "cat", "bracket", "thank", "tornado", "knee", "slim", "crumble", "theory", "shell", "occur", "august", "artwork", "hedgehog", "tobacco", "inherit", "spider", "knife", "churn"];
console.log(mnemonic);
const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
console.log(toHexString(keyPair.secretKey));

function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}