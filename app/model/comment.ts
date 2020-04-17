import db from "../common/db";
export default class comment {
    insertComment(data: any, callback: Function) {
        db.update({
            bizType: "blog",//数据库
            collection: "comment", //数据表
            query: {articalId: data.articalId},
            data: {content: data.content}
        }, (res:any)=> {
            callback(res.result);
        });
    }
    queryCommentListByArticalId(articalId:number, callback: Function) {
        db.select({
            bizType: "blog",//数据库 
            collection: "comment", //数据表
            query: {
                id: articalId
            }
        }, (res:any) => {
            callback(res);   
        });        
    }
}