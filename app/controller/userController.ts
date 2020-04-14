import {controller, get, post} from "../utils/decorator";
// import db from "../common/db";
@controller("/user")
export default class UserController {
    @get("/getUserInfo")
    getUserInfo(req: any) {
        // db.insert({
        //     bizType: "blog",//数据库
        //     collection: "user", //数据表
        //     data: {//数据 document
        //         name: "xiaozhu",
        //         age: 20
        //     }
        // }, (res:any)=> {
        //     console.log(res);
        // })
        return {data: "username"};
    }
    @post("/getUserList")
    getUserList(req: any) {
        return "userList";
    }
}
