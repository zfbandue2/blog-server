import express=require('express');
import scanner from "./utils/scanner";
const app:express.Application=express();
new scanner().buildRouter("./app/controller");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());  
app.listen(8888,function() {
    console.log('Example app listening on port 8888!');
});
global.app = app;//声明为全局

