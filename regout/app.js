var http = require('http');
var mysql = require('mysql');
// var ms = require('./connect.js').mysql_pool;
var express = require('express');
var app=express();
app.use(express.static(__dirname + "/"));
var signin=require('./regout');
app.use('/',signin);


app.listen(8080);