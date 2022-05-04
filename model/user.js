"use strict";

const db = require('../config/dbConn');

const signup_data = (parameter) => {
    return new Promise((resolve, rejects) => {
        db.query('SELECT * FROM member where id = ?', [parameter.id], (err, db_data) => {
            console.log(db_data)
            if (db_data.length == 0) {
                console.log(db_data)
                db.query('INSERT INTO member(name, id, pw, salt) values(?,?,?,?)', [parameter.name, parameter.id, parameter.pw, parameter.salt]);
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

module.exports = {
    signup_data,
    login_data,
}