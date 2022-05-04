"use strict";

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const main = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(session({
    secret: 'blackzat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
app.use("/", main);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;