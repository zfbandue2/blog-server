import db from "../common/db";
export default class user {
    queryUserInfoByPasswordAndUserName(data: any, callback: Function) {
        db.select({
            bizType: "blog",//数据库 
            collection: "user", //数据表
            query: {
                username: data.username,
                password: data.password
            }
        }, (res:any) => {
            callback(res);   
        });
    }
}
