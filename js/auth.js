import {getUserByName} from './apicalls.js';
// all security functions


/* cipher test 
let cipher = crypt.encrypt("FOO BAR");
console.log(cipher);

let decipher = crypt.decrypt(cipher);
console.log(decipher);
*/
let crypt = {
    secret:'origen',
    encrypt : (clear) => {
        let cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
        cipher = cipher.toString();
        return cipher;
      },
    decrypt : (cipher) => {
        let decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
        decipher = decipher.toString(CryptoJS.enc.Utf8);
        return decipher;
      },
};

let loggeduser = {};

let testFromBd = getUserByName('MaxBernas');

let testTrue = {userName:'MaxBernas', password:'asdasd'};
let testFalse = {userName:'Maxbernas', password:'test'};
let userFromBd = await testFromBd.then((res)=>{return res;});


/* Comparing passwords from 2 objects
test:
let checkForCoincidence = await  comparePasswords(testFalse, userFromBd);
console.log(checkForCoincidence);*/
function comparePasswords(input, dbpass) {
    let decripted = crypt.decrypt(dbpass.password);
    return input.password == decripted; }

function encryptPassword(input) {
    let encripted = crypt.encrypt(input);
    return encripted;
}