import db from "../common/db";
export default class comment {
    insertComment(data: any, callback: Function) {
        db.insert({
            bizType: "blog",//数据库
            collection: "comment", //数据表
            data: data
        }, (res:any)=> {
            callback(res.result);
        });
    }
    queryCommentListByArticalId(articalId:number, callback: Function) {
        db.select({
            bizType: "blog",//数据库 
            collection: "comment", //数据表
            query: {
                articalId: articalId
            }
        }, (res:any) => {
            callback(res);   
        });        
    }
}