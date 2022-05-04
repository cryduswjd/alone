"use strict";

const model = require("../model/user");
const bkfd2Password = require('../middlewares/pbk');

const output = {
    main: (req, res) => {
        if(req.session.is_login == true){
            res.render("main", {
                is_login: req.session.is_login,
                name: req.session.name
            });
        } else{
            res.render("main", {
                is_login: false
            });
        }
    },
    login: (req, res) => {
        res.render("login");
    },
    signup: (req, res) => {
        res.render("signup");
    },
    logout: (req, res) => {
        req.session.destroy(function(err) {
            res.redirect("/");
        })
    }
};

const process = {
    login: async (req, res) => {
        try {
            const parameter = {
                "id": req.body.id,
                "pw": req.body.pw
            }
            // console.log(result[0].id);
            // req.session.is_login = true;
            // req.session.user = result[0].id;
            const result = await model.login_data(parameter);
            const hash = result[0].pw;
            const salt = result[0].salt;
            console.log(salt);
            const pbk = await bkfd2Password.decryption(parameter.pw, salt, hash);
            console.log(pbk);
            // req.session.save(function() {
            //     res.render("main",{
            //         output:result[0],
            //         user:result[0], 
            //         is_login:true});
            // })
        } catch (err) {
            console.log("로그인 실패");
            res.render("login");
        }
    },
    signup: async (req, res) => {
        try {
            const parameter = {
                "name": req.body.name,
                "id": req.body.id,
                "pw": req.body.pw
            }
            const pbk = await bkfd2Password.encryption(parameter);
            console.log(pbk);
            parameter.pw = pbk.hash;
            parameter.salt = pbk.salt;
            const result = await model.signup_data(parameter);
            console.log(result);
            res.redirect("/");
        } catch (err) {
            console.log("회원가입 실패")
            res.redirect("/login");
            throw err;
        }
    }
};

module.exports = {
    output,
    process,
};