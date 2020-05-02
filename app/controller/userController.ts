import {controller, get, post} from "../utils/decorator";
import user from "../model/user";
import baseController from "./baseController";
let nodecache = require("nodecache");
let md5 = require("md5");
@controller("/user")
export default class userController extends baseController{
    user: any;
    constructor() {
        super();
        this.user = new user();
    }
    @post("/login")
    login(req: any, res: any) {
        let username = req.param("username");
        let password = req.param("password");
        this.user.queryUserInfoByPasswordAndUserName({
            username: username,
            password: password
        }, (data: any)=> {
            if(data.length > 0) {//登录成功
                let token = md5(username + password);
                nodecache.set(token, data[0].userId);
                this.success({
                    isLogin: "ok",
                    token: token 
                });
            } else {//表示登录失败
                this.error({
                    isLogin: "no"
                });
            }
        });
    }
}