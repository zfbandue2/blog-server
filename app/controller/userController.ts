import {controller, get, post} from "../utils/decorator";
import user from "../model/user";
import baseController from "./baseController";
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
            this.success(data);//给客户端返回json数据
        });
    }
}
