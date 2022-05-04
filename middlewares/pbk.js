"use strict";

const bkfd2Password = require('pbkdf2-password');
const hasher = bkfd2Password();

const encryption = (parameter) => {
    return new Promise((resolve, reject) => {
        hasher({
            password: parameter.pw
        }, (err, pass, salt, hash) => {
            const result = {
                salt, hash
            }
            if (err) reject("Error")
            resolve(result);
        });
    })
}

const decryption = (password, savedSalt, savedHash) => {
    return new Promise((resolve, reject) => {
        hasher({
            password : password,
            salt : savedSalt
        }, (err, pass, salt, hash) =>{
            if(savedHash === hash){
                resolve('로그인 성공')
            } else{
                reject('비밀번호 오류')
            }
        })
    })
}

module.exports = {
    encryption,
    decryption
}