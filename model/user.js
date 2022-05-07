"use strict";

const find = require("../middlewares/find");
const db = require('../config/dbConn');

const signup_data = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT * FROM member where id = ?', [parameter.id], (err, db_data) => {
            console.log(db_data)
            if (db_data.length == 0) {
                console.log(db_data)
                db.query('INSERT INTO member(name, email, id, pw, salt) values(?,?,?,?,?)', [parameter.name, parameter.email, parameter.id, parameter.pw, parameter.salt]);
                resolve(db_data);
            }
            else {
                rejects(err);
            }
        })
    })
}

const login_data = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT pw, salt FROM member where id = ?', [parameter.id], (err, db_data) => {
            if(db_data){
                resolve(db_data);
            }
            else {
                rejects(err);
            }
        })
    })
}

const find_id = (parameter) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM member where email = ?', [parameter.email], (err, db_data) => {
            if(db_data) {
                resolve(db_data);
            }
            else {
                reject(err);
            }
        })
    })
}

//임시비번
//처음 받을 땐 디비에 열 추가
//두 번 이상부터는 디비 값 업데이트

const temporary_pw = (parameter) => {
    return new Promise((resolve, reject) => {
        
    })
}

const chang_pw = (parameter) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE member SET pw, salt where = ?',[parameter.pw, parameter.salt], (err, db_data) => {
            if(db_data) {
                resolve(db_data);
            }
            else {
                reject(err);
            }
        })
    })
}

module.exports = {
    signup_data,
    login_data,
    find_id,
    temporary_pw,
    chang_pw
}